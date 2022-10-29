"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

import re
import datetime

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # email validation (special characters needed)
    regex_email = re.compile(
        r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
    # password minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    regex_password = re.compile(
        "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")

    if not email:
        return jsonify({"created": False, "status": "failed", "msg": "Missing email address!"}), 400
    if not password:
        return jsonify({"created": False, "status": "failed", "msg": "Enter a password!"}), 400
    if not re.fullmatch(regex_email, email):
        return jsonify({"created": False, "status": "failed", "msg": "Not valid email!"}), 400
    if not re.search(regex_password, password):
        return jsonify({"created": False, "status": "failed", "msg": "You need a min 8 characters password, with at least a symbol, upper and lower case letters, and a number"}), 400

    if email and password:
        if User.query.filter_by(email=email).first() is not None:
            return jsonify({"created": False, "status": "failed", "msg": "Email already exists!"}), 409
        else:
            new_user = User(email=email, password=password)

            db.session.add(new_user)
            db.session.commit()

            response_body = {
                "created": True,
                "status": "success",
                "msg": f'Welcome {email}, you succesfully signed up!'
            }

            return jsonify(response_body), 201

    else:
        return jsonify({"created": False, "status": "failed", "msg": "You couldn't sign up!"}), 400


@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if not email:
        return ({"status": "failed", "msg": "Write your email address"}), 400
    if not password:
        return ({"status": "failed", "msg": "Enter your password"}), 400

    if user:
        if password == user.password:
            token_expiration = datetime.timedelta(days=1)
            token = create_access_token(
                identity=email, expires_delta=token_expiration)

            response_body = {
                "status": "success",
                "msg": "You successfuly logged in!",
                "user": user.serialize(),
                "token": token,
            }

            return jsonify(response_body), 200

    return jsonify({"status": "failed", "msg": "Wrong credentials!"}), 401


@api.route('/private', methods=['GET'])
@jwt_required()
def private_access():
    current_user = get_jwt_identity()

    response_body = {
        "status": "success",
        "msg": "Welcome to your private zone!"
    }
    
    return jsonify(response_body), 200

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/sign-in.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Home = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);

  const toggleBtn = () => {
    setShow((prevState) => !prevState);
  };

  const toggle2Btn = () => {
    setShow2((prevState) => !prevState);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="register">
      <div className="login-container">
        <div className="signup">
          <h1 className="fw-bold">Create an account</h1>
          <form onSubmit={e => actions.signup(e, navigate)}>
            <div className="form-floating">
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="form-control floatingInput"
                autoComplete="off"
                value={store.currentUser?.email}
                onChange={e => actions.handleChange(e)}
              />
              <label className="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="form-control floatingPassword"
                autoComplete="off"
                value={store.currentUser?.password}
                onChange={e => actions.handleChange(e)}
              />
              <label className="floatingPassword">Password</label>
            </div>
            <div className="sign-up-btn">
              <input type="submit" value="Create Account" />
            </div>
            <small>
              Already have an account? <Link to="/sign-in"><label>Sign In</label></Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};
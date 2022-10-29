import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/sign-in.css";

export const Register = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

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

            <input type="submit" value="Create Account" className="btn btn-primary" />
            
            <small>
              Already have an account? <Link to="/"><label>Sign In</label></Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};
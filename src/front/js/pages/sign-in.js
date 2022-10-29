import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/sign-in.css";

export const SignIn = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="register">
      <div className="login-container">
        <div className="signin">
          <h1 className="fw-bold">Sign In</h1>
          {store.token && store.token != "" && store.token != undefined ? (
            "You are logged in with this token" + store.token
          ) : (
            <form onSubmit={e => actions.login(e, navigate)}>
              <div className="form-floating">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="form-control"
                  autoComplete="off"
                  value={store.currentUser?.email}
                  onChange={(e) => actions.handleChange(e)}
                />
                <label className="floatingInput">Email</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="form-control"
                  autoComplete="off"
                  value={store.currentUser?.password}
                  onChange={(e) => actions.handleChange(e)}
                />
                <label className="floatingInput">Password </label>
              </div>
              <input type="submit" value="Sign In" className="btn btn-primary"/>
              <small>
                Don't have an account? <Link to="/signup"><label>Sign Up</label></Link>
              </small>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
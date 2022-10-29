import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/profile.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.currentUser === null) {
      navigate("/sign-in");
    }
  }, []);

  return (
    <div className="form">
      <h1 className="fw-bold title">Profile</h1>
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="profile-card">
            <div className="profile-card-body">
              <div className="d-flex flex-column align-items-center text-center img-size">
                <img
                  src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_280x437/public/media/image/2017/01/coche-homer-simpson_1.jpg?itok=wUY9vko5"
                  alt="default-pic"
                  className="rounded-circle"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 profile-card">
          <form onSubmit={(e) => actions.loadProfile(e)}>
            <div className="form_box_input">
              <label htmlFor="name">Name</label>
              <div className="form_box_input_box">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => actions.handleChange(e)}
                  defaultValue={store.currentUser?.name}
                  name="name"
                />
              </div>
            </div>
            <div className="form_box_input">
              <label htmlFor="lastName">Last Name</label>
              <div className="form_box_input_box">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => actions.handleChange(e)}
                  defaultValue={store.currentUser?.lastname}
                  name="lastname"
                />
              </div>
            </div>
            <div className="form_box_input">
              <label htmlFor="email">Email</label>
              <div className="form_box_input_box">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => actions.handleChange(e)}
                  defaultValue={store.currentUser?.email}
                  name="email"
                />
              </div>
            </div>
          </form>
          <div className="logout">
            <input
              type="button"
              value="Log Out"
              className="btn btn-primary"
              onClick={() => actions.logout(navigate)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
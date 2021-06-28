import React from "react";
import { useHistory } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../redux/user/user.actions";

// Components
import MyModal from "../my-modal/my-modal";
import Login from "../login/login";
import Signup from "../signup/signup";

import "./my-navbar.scss";

const MyNavbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const activeUser = useSelector((state) => state.user.activeUser);

  return (
    <nav className="my-navbar navbar navbar-expand-md navbar-light bg-dark mb-md-5">
      <div className="container ">
        <span className="navbar-brand text-light mr-4" onClick={() => history.push("/")}>
          Recipes
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav justify-content-end w-100">
            {activeUser && (
              <>
                <li className="nav-link text-light" onClick={() => history.push("/new-recipe")}>
                  New Recipe
                </li>
                <li className="nav-link text-light" onClick={() => history.push("/edit-recipe")}>
                  Edit Recipe
                </li>
                <li className="nav-link text-light" onClick={() => history.push("/recipe-details")}>
                  Recipe Details
                </li>
              </>
            )}
            {activeUser && (
              <div className="d-md-flex ml-md-auto">
                <li className="nav-link text-light " onClick={() => history.push("/my-profile")}>
                  {activeUser.username}
                </li>
                <li className="nav-link text-light" onClick={() => dispatch(onLogout())}>
                  Logout
                </li>
              </div>
            )}

            {!activeUser && (
              <>
                <li className="nav-link text-light">
                  <MyModal childComponent={Login}>Login</MyModal>
                </li>

                <li className="nav-link text-light">
                  <MyModal childComponent={Signup}>Signup</MyModal>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;

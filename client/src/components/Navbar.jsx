import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../redux/actions";

import "../styles/styles.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const activeUser = useSelector((state) => state.activeUser);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <nav className="my-navbar navbar navbar-expand-md">
      <div className="container">
        <span className="navbar-brand mr-4" onClick={() => {history.push("/"); setCollapsed(true)}} >
          Recipes Farm
        </span>
        <button
          className="navbar-toggler"
          onClick={(e) => {
            e.stopPropagation();
            setCollapsed(!collapsed);
          }}
        >
          <span className="navbar-toggler-icon custom-toggler"></span>
        </button>
        <div className={`navbar-collapse ${collapsed && "collapse"}`} id="navbarSupportedContent">
          <ul className="navbar-nav justify-content-end w-100" onClick={() => setCollapsed(true)}>
            {activeUser && (
              <li className="nav-link " onClick={() => history.push("/add-recipe")}>
                New Recipe
              </li>
            )}
            {activeUser && (
              <div className="d-md-flex ml-md-auto">
                <li className="nav-link  " onClick={() => history.push("/my-profile")}>
                  {activeUser.username}
                </li>
                <li className="nav-link " onClick={() => dispatch(onLogout())}>
                  Logout
                </li>
              </div>
            )}

            {!activeUser && (
              <>
                <li className="nav-link " onClick={() => history.push("/login")}>
                  Login
                </li>
                <li className="nav-link " onClick={() => history.push("/signup")}>
                  Signup
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

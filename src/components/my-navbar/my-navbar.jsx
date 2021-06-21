import React from "react";
import { useHistory } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../redux/user/user.actions";

// STYLES
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./my-navbar.scss";
import MyModal from "../my-modal/my-modal";
import Login from "../login/login";
import Signup from "../signup/signup";

const MyNavbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { activeUser } = useSelector((state) => state.user);

  return (
    <Navbar bg="dark" expand="lg" className="mb-md-5">
      <Container fluid="md">
        <Navbar.Brand className="text-light mr-4" onClick={() => history.push("/")}>
          Recipes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!activeUser && (
            <Nav className="justify-content-end w-100">
              <Nav.Link className="text-light">
                <MyModal childComponent={Login}>Login</MyModal>
              </Nav.Link>
              
              <Nav.Link className="text-light" >
                <MyModal childComponent={Signup}>Signup</MyModal>
              </Nav.Link>
            </Nav>
          )}
          {activeUser && (
            <Nav className="w-100">
              <Nav.Link className="text-light" onClick={() => history.push("/new-recipe")}>
                New Recipe
              </Nav.Link>
              <Nav.Link className="text-light" onClick={() => history.push("/edit-recipe")}>
                Edit Recipe
              </Nav.Link>
              <Nav.Link className="text-light" onClick={() => history.push("/recipe-details")}>
                Recipe Details
              </Nav.Link>

              <div className="d-md-flex ml-md-auto">
                <Nav.Link className="text-light " onClick={() => history.push("/my-profile")}>
                  {activeUser.username}
                </Nav.Link>
                <Nav.Link className="text-light" onClick={() => dispatch(onLogout())}>
                  Logout
                </Nav.Link>
              </div>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

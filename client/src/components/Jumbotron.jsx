import React from "react";
import "../styles/styles.scss";
import logo from "../assets/chef.png";

const Jumbotron = () => {
  return (
    <div className="my-jumbotron">
      <div className="background-img"></div>
      <div className="container">
        <img src={logo} alt="" />
        <h1>Recipes Farm</h1>
        <h3>Your home for recipes</h3>
        <p>
          Recipe Farm is the place to get any recipe that comes to mind. You can also create your own recipe, upload and
          update it. Or don't. That's ok. We'll see what happens.
        </p>
      </div>
    </div>
  );
};

export default Jumbotron;

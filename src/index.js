import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Components
import App from "./App";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import MyProfile from "./components/my-profile/my-profile";
import RecipeDetails from "./components/recipes/recipe-details/recipe-details";
import MyNavbar from "./components/my-navbar/my-navbar";
import RecipeForm from "./components/recipes/recipe-form/recipe-form";
import MainContainer from "./components/main-container/main-container";

// Styles
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";
import "./settings.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <MyNavbar /> */}
          <MyNavbar />
          <MainContainer />

        {/* <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/my-profile" component={MyProfile} />
            <Route exact path={["/new-recipe", "/edit-recipe"]} component={RecipeForm} />
            <Route exact path="/recipe-details" component={RecipeDetails} />
          </Switch> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

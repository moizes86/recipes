import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import {useSelector} from 'react-redux';

// Components
import App from "./App";
import MyNavbar from "./components/my-navbar/my-navbar";
import Recipe from "./components/recipes/recipe/recipe";
import RecipeForm from "./components/recipes/recipe-form/recipe-form";

// Styles
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";
import "./settings.scss";
import MyProfile from "./components/my-profile/my-profile";



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MyNavbar />
        <div className="container-md pb-5">
          <Switch>
            <Route exact path="/" component={App} />

            <Route exact path="/recipe-details" component={Recipe} />
            <Route exact path="/new-recipe" component={RecipeForm} />
            <Route exact path="/my-profile" component={MyProfile} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

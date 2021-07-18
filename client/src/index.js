import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter, Switch, Route } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Components
import App from "./App";
// import Navbar from "./components/Navbar";
// import RecipePage from "./components/RecipePage";
// import RecipeForm from "./components/Forms/RecipeForm";
// import MyProfile from "./components/MyProfile";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import MyRecipes from './components/MyRecipes';

// Styles
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";
import "./styles/styles.scss";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
     
      {/* <BrowserRouter>
        <Navbar />
        <div className="container-md">
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/recipes/:id" component={RecipePage} />
            <Route exact path={["/add-recipe", "/edit-recipe/:recipeId"]} component={RecipeForm} />
            <Route exact path="/my-profile" component={MyProfile} />
            <Route exact path="/my-recipes" component={MyRecipes} />
          </Switch>
        </div>
      </BrowserRouter> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

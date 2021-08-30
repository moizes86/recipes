import React, { useEffect } from "react";
import "./styles/styles.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
// Redux
import { isCookie } from "./services/API_Services/UserAPI";
import { useDispatch } from "react-redux";

// import App from "./App";
import Navbar from "./components/Navbar";
import RecipePage from "./components/RecipePage";
import RecipeForm from "./components/Forms/RecipeForm";
import MyProfile from "./components/MyProfile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyRecipes from "./components/MyRecipes";
import MainPage from "./components/MainPage";
import { onLogin } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const checkUserLoggedInAsync = async () => {
    const result = await isCookie();
    dispatch(onLogin(result.data[0]));
  };

  useEffect(() => checkUserLoggedInAsync());

  return (
    <div className="App">
      <BrowserRouter>
        <div className="full-height">
          <Navbar />
          <div className="container-md">
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/recipes/:id/:title" component={RecipePage} />
              <Route exact path={["/add-recipe", "/edit-recipe/:recipeId"]} component={RecipeForm} />
              <Route exact path="/my-profile" component={MyProfile} />
              <Route exact path="/my-recipes" component={MyRecipes} />
            </Switch>
          </div>
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;

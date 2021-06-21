import React from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import Search from "../search/search";
import RecipeDetails from "../recipes/recipe-details/recipe-details";
import Instructions from "../recipes/instructions/instructions";

// Styles
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AppBackgroundImage } from "./app-background-img.styled";
import './main-container.scss';

const MainContainer = () => {
  const recipe = useSelector((state) => state.search.recipe);
  return (
    <div className="main-container px-5 pb-5 pt-3 mb-5">
      <Row>
        <Search />
      </Row>
      <Row>
        <Col md={6}>
          <img src={recipe.image} alt="" />
          <AppBackgroundImage img={recipe.image} />
        </Col>
        <Col >
          <RecipeDetails recipe={recipe} />
        </Col>
      </Row>
      <Row>
        <Instructions ingredients={recipe.ingredients} directions={recipe.directions} />
      </Row>
    </div>
  );
};

export default MainContainer;

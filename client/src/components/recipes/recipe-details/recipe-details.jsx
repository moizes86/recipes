import React from "react";

// Styles
import Col from "react-bootstrap/Col";

const RecipeDetails = ({recipe}) => {
 
  return (
    <div className="recipe-details ">
      <h1>{recipe.label}</h1>

      <Col>
        <p>
          <a href={recipe.url} target="_blank" rel="noreferrer noopener ">
            {recipe.source}
          </a>
        </p>

        <p>
          <span className="smaller-font"> {recipe.categories.join(", ")}</span>
        </p>

        <p>
          <span>{recipe.description} </span>
        </p>

        <div className="bottom-line-icons">
          <i class="far fa-clock mr-3">
            <span className="ml-1">{recipe.time}</span>
          </i>
          <i class="far fa-utensils mr-3">
            <span className="ml-1">{recipe.yield}</span>
          </i>
          <i class="far fa-tachometer-alt mr-3">
            <span className="ml-1">{recipe.difficulty}</span>
          </i>
        </div>
      </Col>
    </div>
  );
};

export default RecipeDetails;

import React from "react";

const RecipeDetails = ({
  title,
  description,
  source,
  sourceUrl,
  cook,
  servings,
  dietsSelected,
  categoriesSelected,
}) => {
  return (
    <div className="recipe-details ">
      <h3>{title}</h3>

      <div className="col">
        <p>
          <a href={sourceUrl} target="_blank" rel="noreferrer noopener ">
            {source}
          </a>
        </p>

        <span className="text-capitalize smaller-font">
          {categoriesSelected.map((category) => category.title).join(",  ")}
        </span>
        <br />
        <span className="text-capitalize smaller-font">{dietsSelected.map((diet) => diet.title).join(",  ")}</span>

        <p className="mt-3">
          <span>{description} </span>
        </p>

        <div className="bottom-line-icons">
          <i class="far fa-clock mr-3">
            <span className="ml-1">{cook}</span>
          </i>
          <i class="far fa-utensils mr-3">
            <span className="ml-1">{servings}</span>
          </i>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

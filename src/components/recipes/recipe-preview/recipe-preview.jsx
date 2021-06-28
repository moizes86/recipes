import React from "react";
import { useHistory } from "react-router-dom";
import "./recipe-preview.scss";

const RecipePreview = ({
  data: {
    recipe: { label, image, url },
    recipe,
  },
}) => {
  const history = useHistory();

  return (
    <div className="recipe-preview mb-4 col-3">
      <div className="card" onClick={() => history.push('/recipe-details')}>
        <img className="card-img" src={image} alt="" />
        <div className="card-body">
          <div className="card-title">{label}</div>
          <div className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </div>
          <button className="btn btn-primary mt-3" onClick={(e) => e.stopPropagation()}>
            <a target="_blank" rel="noopener noreferrer" href={url}>
              Source
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipePreview;

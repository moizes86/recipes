import React from "react";
import { useHistory } from "react-router-dom";
import "./recipe-preview.scss";

const RecipePreview = ({ data: { title, image_file, image_url, url, description } }) => {
  const history = useHistory();

  return (
    <div className="recipe-preview mb-4 col-3">
      <div className="card" onClick={() => history.push("/recipe-details")}>
        <img className="card-img" src={image_url} alt="" />
        <div className="card-body">
          <div className="card-title">{title}</div>
          <div className="card-text">{description}</div>
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

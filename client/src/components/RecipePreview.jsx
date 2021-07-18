import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/styles.scss";

const RecipePreview = ({ data: { id, title, image_url, description } }) => {
  const history = useHistory();

  return (
    <div className="recipe-preview">
      <div className="thumb-box">
        <span className="link" onClick={() => history.push(`/recipes/${id}`)}>
          <img src={`${process.env.REACT_APP_SERVER_PATH}/${image_url}`} alt="" />
          <span className="overlay-box">
            <span className="title">{title}</span>
            <span className="description">{description}</span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default RecipePreview;

import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/styles.scss";

const RecipePreview = ({ data: { id, _id /*:{$oid: _id}*/, title, urls, description } }) => {
  const history = useHistory();

  return (
    <div className="recipe-preview">
      <div className="thumb-box">
        <span className="link" onClick={() => history.push(`/recipes/${id ?? _id}/${title}`)}>
          <img
            // src={`${process.env.REACT_APP_SERVER_PATH_FLASK}/${image_url}`}
            src={`${process.env.REACT_APP_SERVER_PATH}/${urls?.split(',')[0]}`}
            alt=""
          />
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

import React, { useState, useEffect } from "react";
import { getMyRecipes } from "../services/API_Services/RecipeAPI";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/styles.scss";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { id } = useSelector((state) => state.activeUser);
  const history = useHistory();

  const getMyRecipesAsync = async () => {
    const result = await getMyRecipes(id);
    setRecipes(result.data);
  };
  useEffect(() => {
    getMyRecipesAsync();
  }, []);
  return (
    <div className="my-recipes">
      <h3 className="text-center mb-4">My Recipes</h3>
      <table className="table">
        <tbody>
          {recipes.map((recipe, i) => (
            <tr
              key={`${recipe.title}-${i}`}
              id={recipe.id}
              onClick={() => history.push(`edit-recipe/${recipe.id}`)}
            >
              <td className="col-1">
                <img src={`${process.env.REACT_APP_SERVER_PATH}/${recipe.image_url}`} alt="" />
              </td>
              <td>{recipe.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRecipes;

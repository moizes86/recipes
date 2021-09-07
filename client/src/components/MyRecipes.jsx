import React, { useState, useEffect } from "react";
import { deleteRecipe, getMyRecipes } from "../services/API_Services/RecipeAPI";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useFetch from "../useFetch";
import "../styles/styles.scss";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const {
    id,
    /*_id: { $oid: _id },*/
  } = useSelector((state) => state.activeUser);
  const history = useHistory();

  const { sendRequest, loading, Spinner } = useFetch();

  const getMyRecipesAsync = async () => {
    const result = await getMyRecipes(id /*??_id*/);
    return setRecipes(result.data);
  };

  useEffect(() => {
    getMyRecipesAsync();
  }, []);
  return (
    <div className="my-recipes">
      <h3 className="text-center mb-4">My Recipes</h3>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table">
          <tbody>
            {recipes.map((recipe, i) => (
              <tr
                key={`${recipe.title}-${i}`}
                id={recipe.id}
                onClick={() => history.push(`edit-recipe/${recipe.id /*?? recipe._id["$oid"]*/}`)}
              >
                <td className="col-1">
                  <img src={`${process.env.REACT_APP_SERVER_PATH}/${recipe.urls}`} alt="" />
                </td>
                <td>{recipe.title}</td>
                <td>
                  <i
                    className="far fa-trash-alt"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await sendRequest(deleteRecipe, recipe.id);
                      getMyRecipesAsync();
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyRecipes;

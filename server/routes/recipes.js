var express = require("express");
var router = express.Router();

const db = require("../db");

router.get("/", function (req, res) {
  const query = "SELECT * FROM recipesapp.recipes;";
  return db._query(res, query);
});

router.get("/measuring-units", function (req, res) {
  const login_query = `SELECT * FROM recipesapp.measuring_units`;
  return db._query(res, login_query);
});

router.get("/diet-types", function (req, res) {
  const login_query = `SELECT * FROM recipesapp.diets`;
  return db._query(res, login_query);
});

router.get("/meal-types", function (req, res) {
  const login_query = `SELECT * FROM recipesapp.meals`;
  return db._query(res, login_query);
});

router.get("/difficulty-levels", function (req, res) {
  const login_query = `SELECT * FROM recipesapp.difficulty_levels`;
  return db._query(res, login_query);
});

router.post("/add-recipe", function (req, res) {
  console.log(req.body);

  const { user_id, title, description, source, url, yield, prepTime, difficultyLevel } =
    req.body;

  const addRecipe_query = `INSERT INTO recipesapp.recipes \
                (user_id, title, description, source, url, yield, prep_time, difficulty) \
                VALUES 
                (${user_id}, '${title}', '${description}', '${source}', '${url}', ${+yield}, ${+prepTime}, ${difficultyLevel})`;

  const addIngredients_query = `INSERT INTO recipesapp.ingredients (note, recipe_id, unit_id) 
  VALUES ('${note}', ${recipe_id}, ${unit_id});
`;
  const addInstructions_query=``;
  const addMealTypes_query = ``;
  const addDietTypes_query=``
  const insertId =  db._query(res, addRecipe_query);
});

module.exports = router;

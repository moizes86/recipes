var express = require("express");
var router = express.Router();

const {
  getRecipes,
  getMeasuringUnits,
  getDietTypes,
  getMealTypes,
  getDifficultyLevels,
} = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await getRecipes();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/measuring-units", async (req, res) => {
  try {
    const result = await getMeasuringUnits();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/diet-types", async (req, res) => {
  try {
    const result = await getDietTypes();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/meal-types", async (req, res) => {
  try {
    const result = await getMealTypes();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/difficulty-levels", async (req, res) => {
  try {
    const result = await getDifficultyLevels();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.post("/add-recipe", function (req, res) {
  console.log(req.body);

  const { user_id, title, description, source, url, yield, prepTime, difficultyLevel } = req.body;

  const addRecipe_query = `INSERT INTO recipesapp.recipes \
                (user_id, title, description, source, url, yield, prep_time, difficulty) \
                VALUES 
                (${user_id}, '${title}', '${description}', '${source}', '${url}', ${+yield}, ${+prepTime}, ${difficultyLevel})`;

  const addIngredients_query = `INSERT INTO recipesapp.ingredients (note, recipe_id, unit_id) 
  VALUES ('${note}', ${recipe_id}, ${unit_id});
`;
  const addInstructions_query = ``;
  const addMealTypes_query = ``;
  const addDietTypes_query = ``;
  const insertId = db._query(res, addRecipe_query);
});

module.exports = router;

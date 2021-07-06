var express = require("express");
var router = express.Router();
const {
  validateEmail,
  validateRequired,
  validateRecipeTitle,
  validateSourceUrl,
  validateYield,
  validatePrepTime,
  validateDifficultyLevel,
  validateImage,
  validateIngredients,
  validateInstructions,
} = require("../../validations");

const {
  getRecipes,
  getMeasuringUnits,
  getDietTypes,
  getMealTypes,
  getDifficultyLevels,
  createRecipe,
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

router.post("/add-recipe", async (req, res) => {
  try {
    // Proccess req.body
    let {
      userId,
      title,
      description,
      source,
      sourceUrl,
      yield,
      prepTime,
      difficultyLevel,
      img,
      dietTypes,
      mealTypes,
      ingredients,
      instructions,
    } = req.body;
    userId = +userId;
    yield = +yield;
    prepTime = +prepTime;
    difficultyLevel = +difficultyLevel;
    ingredients = JSON.parse(ingredients);
    instructions = JSON.parse(instructions);
    // End proccess req.body

    // Validate values
    validateRequired("UserId", userId);
    validateRequired("Description", description);
    validateRecipeTitle(title);
    validateIngredients(ingredients);
    validateInstructions(instructions);
    if (sourceUrl) validateSourceUrl(sourceUrl);
    if (yield) validateYield(yield);
    if (prepTime) validatePrepTime(prepTime);
    if (difficultyLevel) validateDifficultyLevel(difficultyLevel);
    if (img) validateImage(img);
    // End validate values

    // Add to recipes table
    const resultCreateRecipe = await createRecipe(
      userId,
      title,
      description,
      source,
      sourceUrl,
      yield,
      prepTime,
      difficultyLevel,
      img
    );

    res.status(200).send(resultCreateRecipe);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = router;

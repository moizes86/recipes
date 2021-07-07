var express = require("express");
var router = express.Router();
const {
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
  getRecipe,
  getIngredientsForRecipe,
  getInstructionsForRecipe,
  getDietsForRecipe,
  getCategoriesForRecipe,
  getMeasuringUnits,
  getDifficultyLevels,
  getDiets,
  getCategories,
  createRecipe,
  addIngredients,
  addInstructions,
  addDiets,
  addCategories,
} = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await getRecipes();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/recipe?:recipeId", async (req, res) => {
  try {
    const {recipeId} = req.query;
    const recipe = await getRecipe(recipeId);
    const ingredients = await getIngredientsForRecipe(recipeId);
    const instructions = await getInstructionsForRecipe(recipeId);
    const diets = await getDietsForRecipe(recipeId);
    const categories = await getCategoriesForRecipe(recipeId);
    
    res.status(200).json({recipe,ingredients, instructions, diets, categories});
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

router.get("/diets", async (req, res) => {
  try {
    const result = await getDiets();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const result = await getCategories();
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
    const {
      userId,
      title,
      description,
      source,
      sourceUrl,
      yield,
      prepTime,
      difficultyLevel,
      img,
      diets,
      categories,
      ingredients,
      instructions,
    } = req.body;

    userId = +userId;
    yield = +yield;
    prepTime = +prepTime;
    difficultyLevel = +difficultyLevel;
    ingredients = JSON.parse(ingredients);
    instructions = JSON.parse(instructions);
    diets = JSON.parse(diets);
    categories = JSON.parse(categories);
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

    const newRecipeId = resultCreateRecipe.insertId;

    await addIngredients(newRecipeId, ingredients);
    await addInstructions(newRecipeId, instructions);
    await addDiets(newRecipeId, diets);
    await addCategories(newRecipeId, categories);

    res.status(200).send("OK");
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = router;

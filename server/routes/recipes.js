var express = require("express");
var router = express.Router();
const { validationsAPI } = require("../DAL/validations");

const { recipesAPI } = require("../DAL/db");

router.get("/", async (req, res) => {
  try {
    const [result] = await recipesAPI.getRecipes();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/recipe?:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.query;
    const recipe = await recipesAPI.getRecipe(recipeId);
    const ingredients = await recipesAPI.getIngredientsForRecipe(recipeId);
    const instructions = await recipesAPI.getInstructionsForRecipe(recipeId);
    const diets = await recipesAPI.getDietsForRecipe(recipeId);
    const categories = await recipesAPI.getCategoriesForRecipe(recipeId);

    res.status(200).json({ recipe, ingredients, instructions, diets, categories });
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/measuring-units", async (req, res) => {
  try {
    const [result] = await recipesAPI.getMeasuringUnits();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/diets", async (req, res) => {
  try {
    const [result] = await recipesAPI.getDiets();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const [result] = await recipesAPI.getCategories();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/difficulty-levels", async (req, res) => {
  try {
    const [result] = await recipesAPI.getDifficultyLevels();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.post("/add-recipe", async (req, res) => {
  try {
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
      diets,
      categories,
      ingredients,
      instructions,
    } = req.body;

    ingredients = JSON.parse(ingredients);
    instructions = JSON.parse(instructions);
    diets = JSON.parse(diets);
    categories = JSON.parse(categories);

    // Validate values
    validationsAPI.required("UserId", userId);
    validationsAPI.required("Description", description);
    validationsAPI.recipeTitle(title);
    validationsAPI.ingredients(ingredients);
    validationsAPI.instructions(instructions);
    if (sourceUrl) validationsAPI.sourceUrl(sourceUrl);
    if (yield) validationsAPI.yield(yield);
    if (prepTime) validationsAPI.prepTime(prepTime);
    if (difficultyLevel) validationsAPI.difficultyLevel(difficultyLevel);
    if (img) validationsAPI.image(img);
    // End validate values

    // Add to recipes table
    const [resultCreateRecipe] = await recipesAPI.createRecipe(
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

    await recipesAPI.addIngredients(newRecipeId, ingredients);
    await recipesAPI.addInstructions(newRecipeId, instructions);
    await recipesAPI.addDiets(newRecipeId, diets);
    await recipesAPI.addCategories(newRecipeId, categories);

    res.status(200).send("OK");
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = router;

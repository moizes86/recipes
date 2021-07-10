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
    const [ingredients] = await recipesAPI.getIngredientsForRecipe(recipeId);
    const instructions = await recipesAPI.getInstructionsForRecipe(recipeId);
    const dietsSelected = await recipesAPI.getDietsForRecipe(recipeId);
    const categoriesSelected = await recipesAPI.getCategoriesForRecipe(recipeId);

    res.status(200).json({ ...recipe, ingredients, instructions, dietsSelected, categoriesSelected });
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
      user_id,
      title,
      description,
      source,
      source_url,
      _yield,
      prep_time,
      difficulty,
      image,
      dietsSelected,
      categoriesSelected,
      ingredients,
      instructions,
    } = req.body;

    // Validate values
    validationsAPI.required("UserId", user_id);
    validationsAPI.required("Description", description);
    validationsAPI.recipeTitle(title);
    validationsAPI.ingredients(ingredients);
    validationsAPI.instructions(instructions);
    if (source_url) validationsAPI.sourceUrl(source_url);
    if (_yield) validationsAPI.yield(_yield);
    if (prep_time) validationsAPI.prepTime(prep_time);
    if (difficulty) validationsAPI.difficultyLevel(difficulty);
    if (image) validationsAPI.image(image);
    // End validate values

    // Add to recipes table
    const [resultCreateRecipe] = await recipesAPI.createRecipe(
      user_id,
      title,
      description,
      source,
      source_url,
      _yield,
      prep_time,
      difficulty,
      image
    );

    const newRecipeId = resultCreateRecipe.insertId;
    if (!newRecipeId) throw new Error(resultCreateRecipe);

    await recipesAPI.addIngredients(newRecipeId, ingredients);
    await recipesAPI.addInstructions(newRecipeId, instructions);
    await recipesAPI.addDiets(newRecipeId, dietsSelected);
    await recipesAPI.addCategories(newRecipeId, categoriesSelected);

    res.status(200).send("OK");
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.put("/edit-recipe", async (req, res) => {
  try {
    let {
      id: recipeId,
      title,
      description,
      source,
      source_url,
      _yield,
      prep_time,
      difficulty,
      image,
      dietsSelected,
      categoriesSelected,
      ingredients,
      instructions,
      ingredientsDeleted,
      instructionsDeleted,
    } = req.body;

    // Validate values
    //  validationsAPI.required("UserId", user_id);
    validationsAPI.required("Description", description);
    validationsAPI.recipeTitle(title);
    validationsAPI.ingredients(ingredients);
    validationsAPI.instructions(instructions);
    if (source_url) validationsAPI.sourceUrl(source_url);
    if (_yield) validationsAPI.yield(_yield);
    if (prep_time) validationsAPI.prepTime(prep_time);
    if (difficulty) validationsAPI.difficultyLevel(difficulty);
    if (image) validationsAPI.image(image);
    // End validate values

    // Add to recipes table
    await recipesAPI.updateRecipe(
      recipeId,
      title,
      description,
      source,
      source_url,
      _yield,
      prep_time,
      difficulty,
      image
    );

    // Ingredients
    await ingredientsDeleted.forEach((ingredientId) => recipesAPI.deleteIngredients(recipeId, ingredientId));
    await recipesAPI.addIngredients(recipeId, ingredients);

    // Instructions
    await instructionsDeleted.forEach((instructionId) => recipesAPI.deleteInstructions(recipeId, instructionId));
    await recipesAPI.addInstructions(recipeId, instructions);
    // Diets
    await recipesAPI.deleteDiets(recipeId);
    await recipesAPI.addDiets(recipeId, dietsSelected);

    // Categories
    await recipesAPI.deleteCategories(recipeId);
    await recipesAPI.addCategories(recipeId, categoriesSelected);

    res.status(200).send("OK");
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
const { validationsAPI } = require("../DAL/validations");

const { recipesAPI } = require("../DAL/db");
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },

});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: imageFilter });

router.get("/", async (req, res) => {
  try {
    const [result] = await recipesAPI.getRecipes();
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/search?:q", async (req, res) => {
  try {
    const { q } = req.query;
    const [result] = await recipesAPI.getRecipesBySearch(q);
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

router.post("/add-recipe", upload.single("image_url"), async (req, res) => {
  try {
    let {
      title,
      description,
      source,
      source_url,
      servings,
      cook,
      dietsSelected,
      categoriesSelected,
      ingredients,
      instructions,
    } = req.body;

    const user_id = req.cookies.user[0].id;
    let image = req.file?.path;

    ingredients = JSON.parse(ingredients);
    instructions = JSON.parse(instructions);
    dietsSelected = JSON.parse(dietsSelected);
    categoriesSelected = JSON.parse(categoriesSelected);

    // Validate values
    validationsAPI.required("UserId", user_id);
    validationsAPI.required("Description", description);
    validationsAPI.recipeTitle(title);
    validationsAPI.ingredients(ingredients);
    validationsAPI.instructions(instructions);
    validationsAPI.servings(servings);
    validationsAPI.cook(cook);
    if (source_url) validationsAPI.sourceUrl(source_url);
    if (image) validationsAPI.image(image);
    // End validate values

    // Add to recipes table
    const [resultCreateRecipe] = await recipesAPI.createRecipe(
      user_id,
      title,
      description,
      source,
      source_url,
      servings,
      cook,
      image
    );

    const newRecipeId = resultCreateRecipe.insertId;

    await recipesAPI.addIngredients(newRecipeId, ingredients);
    await recipesAPI.addInstructions(newRecipeId, instructions);
    await recipesAPI.addDiets(newRecipeId, dietsSelected);
    await recipesAPI.addCategories(newRecipeId, categoriesSelected);

    res.status(200).send("OK");
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.put("/edit-recipe", upload.single("image_url"), async (req, res) => {
  try {
    let {
      id: recipe_id,
      title,
      description,
      source,
      source_url,
      servings,
      cook,
      dietsSelected,
      categoriesSelected,
      ingredients,
      instructions,
      ingredientsDeleted,
      instructionsDeleted,
    } = req.body;

    let image = req.file?.path;
    ingredients = JSON.parse(ingredients);
    instructions = JSON.parse(instructions);
    ingredientsDeleted = JSON.parse(ingredientsDeleted);
    instructionsDeleted = JSON.parse(instructionsDeleted);
    dietsSelected = JSON.parse(dietsSelected);
    categoriesSelected = JSON.parse(categoriesSelected);

    // Validate values
    validationsAPI.user(req.cookies.user[0].id);
    validationsAPI.required("Description", description);
    validationsAPI.recipeTitle(title);
    validationsAPI.ingredients(ingredients);
    validationsAPI.instructions(instructions);
    validationsAPI.cook(cook);
    validationsAPI.servings(servings);
    if (source_url) validationsAPI.sourceUrl(source_url);

    // End validate values

    // Add to recipes table
    await recipesAPI.updateRecipe(recipe_id, title, description, source, source_url, servings, cook, image);

    // Ingredients
    await ingredientsDeleted.forEach((ingredientId) => recipesAPI.deleteIngredients(ingredientId));
    await recipesAPI.addIngredients(recipe_id, ingredients);

    // Instructions
    await instructionsDeleted.forEach((instructionId) => recipesAPI.deleteInstructions(instructionId));
    await recipesAPI.addInstructions(recipe_id, instructions);

    // Diets
    await recipesAPI.deleteDiets(recipe_id);
    await recipesAPI.addDiets(recipe_id, dietsSelected);

    // Categories
    await recipesAPI.deleteCategories(recipe_id);
    await recipesAPI.addCategories(recipe_id, categoriesSelected);

    res.status(200).send("OK");
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

router.get("/my-recipes?:id", async (req, res) => {
  const { userId } = req.query;
  try {
    const [result] = await recipesAPI.getMyRecipes(userId);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = router;

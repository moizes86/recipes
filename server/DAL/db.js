var mysql = require("mysql2");

const pool = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "password",
  database: "recipesapp",
});
// now get a Promise wrapped instance of that pool
const promisePool = pool.promise();

const usersAPI = {
  async signup(email, username, password) {
    try {
      return await promisePool.execute("INSERT INTO recipesapp.users (email, username, password ) VALUES (?,?,?);", [
        email,
        username,
        password,
      ]);
    } catch (e) {
      return [e];
    }
  },

  async login(email, password) {
    try {
      return await promisePool.execute("SELECT * FROM recipesapp.users WHERE (email = ? AND password = ?);", [
        email,
        password,
      ]);
    } catch (e) {
      return [e];
    }
  },

  async updateDetails(id, username, password) {
    try {
      return await promisePool.execute("UPDATE recipesapp.users SET username = ?, password= ? WHERE id = ?;", [
        username,
        password,
        id,
      ]);
    } catch (e) {
      return [e];
    }
  },
};

const recipesAPI = {
  async getRecipes() {
    try {
      return ([result] = await promisePool.execute(`SELECT * FROM recipesapp.recipes;`));
    } catch (e) {
      return [e];
    }
  },

  async getRecipe(recipeId) {
    try {
      return ([result] = await promisePool.execute("SELECT * FROM recipesapp.recipes WHERE (id = ?);", [recipeId]));
    } catch (e) {
      return [e];
    }
  },

  async getIngredientsForRecipe(recipeId) {
    try {
      return ([result] = await promisePool.execute(
        "SELECT i.note, i.amount, mu.unit \
        FROM recipesapp.ingredients i \
        JOIN recipesapp.measuring_units mu \
        ON i.unit_id= mu.id AND i.recipe_id = ? \
        WHERE i.unit_id = mu.id;",
        [recipeId]
      ));
    } catch (e) {
      return [e];
    }
  },

  async getInstructionsForRecipe(recipeId) {
    try {
      let [result] = await promisePool.execute(
        "SELECT instruction FROM recipesapp.instructions \
        WHERE recipe_id = ? ;",
        [recipeId]
      );
      return result.map((item) => item.instruction);
    } catch (e) {
      return [e];
    }
  },

  async getDietsForRecipe(recipeId) {
    try {
      let [result] = await promisePool.execute(
        "SELECT d.title \
        FROM recipesapp.diets d \
        JOIN recipesapp.recipes_diets rd \
        ON rd.diet_id = d.id \
        WHERE rd.recipe_id= ? ;",
        [recipeId]
      );
      return result.map((item) => item.title);
    } catch (e) {
      return [e];
    }
  },

  async getCategoriesForRecipe(recipeId) {
    try {
      let [result] = await promisePool.execute(
        "SELECT c.title \
        FROM recipesapp.categories c \
        JOIN recipesapp.recipes_categories rc \
        ON rc.category_id = c.id \
        WHERE rc.recipe_id= ? ;",
        [recipeId]
      );
      return result.map((item) => item.title);
    } catch (e) {
      return [e];
    }
  },

  async getCategories() {
    try {
      return await promisePool.execute(`SELECT * FROM recipesapp.categories;`);
    } catch (e) {
      return [e];
    }
  },

  async getMeasuringUnits() {
    try {
      return await promisePool.execute(`SELECT * FROM recipesapp.measuring_units;`);
    } catch (e) {
      return [e];
    }
  },

  async getDiets() {
    try {
      return await promisePool.execute(`SELECT * FROM recipesapp.diets;`);
    } catch (e) {
      return [e];
    }
  },

  async getDifficultyLevels() {
    try {
      return await promisePool.execute("SELECT * FROM recipesapp.difficulty_levels;");
    } catch (e) {
      return [e];
    }
  },

  async createRecipe(userId, title, description, source, sourceUrl, yield, prepTime, difficultyLevel, img) {
    try {
      return ([result] = await promisePool.execute(
        "INSERT INTO recipesapp.recipes \
        (user_id, title, description, source, source_url, yield, prep_time, difficulty, image_url)\
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [userId, title, description, source, sourceUrl, yield, prepTime, difficultyLevel, img]
      ));
    } catch (e) {
      return [e];
    }
  },

  async addIngredients(recipeId, ingredients) {
    try {
      ingredients.forEach((ingredient) => {
        const { note, amount, unitId } = ingredient;
        promisePool.execute(
          "INSERT INTO recipesapp.ingredients\
         ( recipe_id, note , amount, unit_id)\
          VALUES (?,?,?,?)",
          [recipeId, note, amount, unitId]
        );
      });
    } catch (e) {
      return [e];
    }
  },

  async addInstructions(recipeId, instructions) {
    try {
      instructions.forEach((instruction) => {
        promisePool.execute(
          "INSERT INTO recipesapp.instructions\
          (recipe_id, instruction)\
          VALUES (?,?)",
          [recipeId, instruction]
        );
      });
    } catch (e) {
      return [e];
    }
  },

  async addDiets(recipeId, diets) {
    try {
      diets.forEach((dietId) => {
        promisePool.execute(
          "INSERT INTO recipesapp.recipes_diets\
          (recipe_id, diet_id)\
          VALUES (?,?)",
          [recipeId, dietId]
        );
      });
    } catch (e) {
      return [e];
    }
  },

  async addCategories(recipeId, categories) {
    try {
      categories.forEach((categoryId) => {
        promisePool.execute(
          "INSERT INTO recipesapp.recipes_categories\
          (recipe_id, category_id)\
          VALUES (?,?)",
          [recipeId, categoryId]
        );
      });
    } catch (e) {
      return [e];
    }
  },
};

module.exports = {
  recipesAPI,
  usersAPI,
};

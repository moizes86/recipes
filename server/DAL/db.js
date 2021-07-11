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
      return e;
    }
  },

  async getRecipesBySearch(q) {
    try {
      return ([result] = await promisePool.execute(
        `SELECT * FROM recipesapp.recipes WHERE title LIKE N'%${q}%' \ 
        ORDER BY case when title LIKE N'${q}%' then 1 else 2 end;;`
      ));
    } catch (e) {
      return e;
    }
  },

  async getRecipe(recipeId) {
    try {
      const [result] = await promisePool.execute(
        "SELECT *, user_id as userId FROM recipesapp.recipes WHERE (id = ?);",
        [recipeId]
      );
      return result[0];
    } catch (e) {
      return e;
    }
  },

  async getIngredientsForRecipe(recipeId) {
    try {
      return ([result] = await promisePool.execute(
        "SELECT i.id, i.note, i.amount, mu.id as unitId, mu.unit \
        FROM recipesapp.ingredients i \
        JOIN recipesapp.measuring_units mu \
        ON i.unit_id= mu.id AND i.recipe_id = ? \
        WHERE i.unit_id = mu.id;",
        [recipeId]
      ));
    } catch (e) {
      return e;
    }
  },

  async getInstructionsForRecipe(recipeId) {
    try {
      let [result] = await promisePool.execute(
        "SELECT id, instruction FROM recipesapp.instructions \
        WHERE recipe_id = ? ;",
        [recipeId]
      );
      return result;
    } catch (e) {
      return e;
    }
  },

  async getDietsForRecipe(recipeId) {
    try {
      let [result] = await promisePool.execute(
        "SELECT d.id \
        FROM recipesapp.diets d \
        JOIN recipesapp.recipes_diets rd \
        ON rd.diet_id = d.id \
        WHERE rd.recipe_id= ? ;",
        [recipeId]
      );
      return result.map((item) => item.id);
    } catch (e) {
      return e;
    }
  },

  async getCategoriesForRecipe(recipeId) {
    try {
      let [result] = await promisePool.execute(
        "SELECT c.id \
        FROM recipesapp.categories c \
        JOIN recipesapp.recipes_categories rc \
        ON rc.category_id = c.id \
        WHERE rc.recipe_id= ? ;",
        [recipeId]
      );
      return result.map((item) => item.id);
    } catch (e) {
      return e;
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

  async createRecipe(
    userId,
    title,
    description,
    source = null,
    url = null,
    yield = null,
    prepTime = null,
    difficultyLevel = null,
    image = null
  ) {
    try {
      return ([result] = await promisePool.execute(
        "INSERT INTO recipesapp.recipes \
        (user_id, title, description, source, source_url, yield, prep_time, difficulty, image_url)\
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [userId, title, description, source, url, yield, prepTime, difficultyLevel, image]
      ));
    } catch (e) {
      return [e];
    }
  },

  async addIngredients(recipeId, ingredients) {
    try {
      ingredients.forEach((ingredient) => {
        const { id, note, amount, unitId } = ingredient;
        promisePool.execute(
          "INSERT IGNORE INTO recipesapp.ingredients\
         ( id, recipe_id, note , amount, unit_id)\
          VALUES (?,?,?,?,?)",
          [id, recipeId, note, amount, unitId]
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
          "INSERT IGNORE INTO recipesapp.instructions\
          (id, recipe_id, instruction)\
          VALUES (?,?,?)",
          [instruction.id ?? null, recipeId, instruction.instruction]
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

  async deleteDiets(recipeId) {
    try {
      promisePool.execute("DELETE FROM recipesapp.recipes_diets WHERE recipe_id = ?", [recipeId]);
    } catch (e) {
      return e;
    }
  },

  async deleteCategories(recipeId) {
    try {
      promisePool.execute("DELETE FROM recipesapp.recipes_categories WHERE recipe_id = ?", [recipeId]);
    } catch (e) {
      return e;
    }
  },

  async deleteIngredients(recipeId, ingredientId) {
    try {
      promisePool.execute("DELETE FROM recipesapp.ingredients WHERE recipe_id = ? AND id = ? ;", [
        recipeId,
        ingredientId,
      ]);
    } catch (e) {
      return e;
    }
  },

  async deleteInstructions(recipeId, instructionId) {
    try {
      promisePool.execute("DELETE FROM recipesapp.instructions WHERE recipe_id = ? AND id = ? ;", [
        recipeId,
        instructionId,
      ]);
    } catch (e) {
      return e;
    }
  },

  async updateRecipe(recipeId, title, description, source, url, yield, prepTime, difficultyLevel, image) {
    try {
      return ([result] = await promisePool.execute(
        "UPDATE recipesapp.recipes SET \
        title = ?, description =? , source=?, source_url=?, yield=?, prep_time=?, difficulty=?, image_url=? \
        WHERE id = ?",
        [
          title,
          description,
          source ?? null,
          url ?? null,
          yield ?? null,
          prepTime ?? null,
          difficultyLevel ?? null,
          image ?? null,
          recipeId,
        ]
      ));
    } catch (e) {
      return e;
    }
  },
};

module.exports = {
  recipesAPI,
  usersAPI,
};

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
      return await promisePool.execute(
        "INSERT INTO recipesapp.users (email, username, password ) VALUES (?,?,?);",
        [email, username, password]
      );
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
      return await promisePool.execute(
        "UPDATE recipesapp.users SET username = ?, password= ? WHERE id = ?;",
        [username, password, id]
      );
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
      const [result] = await promisePool.execute("SELECT * FROM recipesapp.recipes WHERE (id = ?);", [
        recipeId,
      ]);
      return result[0];
    } catch (e) {
      return e;
    }
  },

  async getIngredientsForRecipe(recipeId) {
    try {
      return ([result] = await promisePool.execute(
        "SELECT i.id, i.text, i.amount, mu.id as unitId, mu.unit \
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
        "SELECT * FROM recipesapp.instructions \
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
        "SELECT d.id, d.title \
        FROM recipesapp.diets d \
        JOIN recipesapp.recipes_diets rd \
        ON rd.diet_id = d.id \
        WHERE rd.recipe_id= ? ;",
        [recipeId]
      );
      return result;
    } catch (e) {
      return e;
    }
  },

  async getCategoriesForRecipe(recipeId) {
    try {
      let [result] = await promisePool.execute(
        "SELECT c.id, c.title \
        FROM recipesapp.categories c \
        JOIN recipesapp.recipes_categories rc \
        ON rc.category_id = c.id \
        WHERE rc.recipe_id= ? ;",
        [recipeId]
      );
      return result;
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

  async createRecipe(
    user_id,
    title,
    description,
    source = null,
    source_url = null,
    servings,
    cook,
    image = null
  ) {
    try {
      return ([result] = await promisePool.execute(
        "INSERT INTO recipesapp.recipes \
        (user_id, title, description, source, source_url, servings, cook, image_url)\
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [user_id, title, description, source, source_url, servings, cook, image]
      ));
    } catch (e) {
      return e;
    }
  },

  async addIngredients(recipeId, ingredients) {
    try {
      ingredients.forEach((ingredient) => {
        const { id, text, amount, unitId } = ingredient;
        promisePool.execute(
          "INSERT IGNORE INTO recipesapp.ingredients\
         ( id, recipe_id, text , amount, unit_id)\
          VALUES (?,?,?,?,?)",
          [id ?? null, recipeId, text, amount, unitId]
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
          (id, recipe_id, text)\
          VALUES (?,?,?)",
          [instruction.id ?? null, recipeId, instruction.text]
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

  async deleteIngredients(ingredientId) {
    try {
      promisePool.execute("DELETE FROM recipesapp.ingredients WHERE id = ? ;", [ingredientId]);
    } catch (e) {
      return e;
    }
  },

  async deleteInstructions(instructionId) {
    try {
      promisePool.execute("DELETE FROM recipesapp.instructions WHERE id = ? ;", [instructionId]);
    } catch (e) {
      return e;
    }
  },

  async updateRecipe(recipeId, title, description, source, url, servings, cook, image_url) {
    try {
      return ([result] = await promisePool.execute(
        "UPDATE recipesapp.recipes SET \
        title = ?, description =? , source=?, source_url=?, servings=?, cook=? , image_url = ? \
        WHERE id = ?",
        [
          title,
          description,
          source ?? null,
          url ?? null,
          servings ?? null,
          cook ?? null,
          image_url ?? null,
          recipeId,
        ]
      ));
    } catch (e) {
      return e;
    }
  },

  async editIngredient(id, amount) {
    try {
      return ([result] = await promisePool.execute(
        "UPDATE recipesapp.ingredients SET amount= ? \
        WHERE id = ?",
        [amount, id]
      ));
    } catch (e) {
      return e;
    }
  },

  async getMyRecipes(id) {
    try {
      return ([result] = await promisePool.execute("SELECT * FROM recipesapp.recipes WHERE user_id=?", [id]));
    } catch (e) {
      return e;
    }
  },
};

module.exports = {
  recipesAPI,
  usersAPI,
};

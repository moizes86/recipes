const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "recipesapp",
});

db.connect((error) => {
  if (error) throw Error(error);
  console.log("DB Connected!");
});

const signup = async (email, username, password) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        "INSERT INTO recipesapp.users (email, username, password ) VALUES (?,?,?) ",
        [email, username, password],
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            //if needed - map the result to the required json
            resolve(result);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        "SELECT * FROM recipesapp.users WHERE (email = ? AND password = ?)",
        [email, password],
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const updateDetails = async (id, username, password) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        "UPDATE recipesapp.users SET username = ?, password= ? WHERE id = ?;",
        [username, password, id],
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getRecipes = async () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(`SELECT * FROM recipesapp.recipes;`, (error, result, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getRecipe = async (recipeId) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        "SELECT * FROM recipesapp.recipes\
        WHERE (id = ?);",
        [recipeId],
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getIngredientsForRecipe = async (recipeId) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        "SELECT i.note, i.amount, mu.unit \
        FROM recipesapp.ingredients i \
        JOIN recipesapp.measuring_units mu \
        ON i.unit_id= mu.id AND i.recipe_id = ? \
        WHERE i.unit_id = mu.id;",
        [recipeId],
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getInstructionsForRecipe = async (recipeId) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        "SELECT instruction FROM recipesapp.instructions \
        WHERE recipe_id = ? ;",
        [recipeId],
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            result = result.map((item) => item.instruction);
            resolve(result);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getDietsForRecipe = async (recipeId) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        "SELECT d.title \
        FROM recipesapp.diets d \
        JOIN recipesapp.recipes_diets rd \
        ON rd.diet_id = d.id \
        WHERE rd.recipe_id= ? ;",
        [recipeId],
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            result = result.map((item) => item.title);
            resolve(result);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getCategoriesForRecipe = async (recipeId) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        "SELECT c.title \
        FROM recipesapp.categories c \
        JOIN recipesapp.recipes_categories rc \
        ON rc.category_id = c.id \
        WHERE rc.recipe_id= ? ;",
        [recipeId],
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            result = result.map((item) => item.title);
            resolve(result);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const getMeasuringUnits = async () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(`SELECT * FROM recipesapp.measuring_units;`, (error, result, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDiets = async () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(`SELECT * FROM recipesapp.diets;`, (error, result, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getCategories = async () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(`SELECT * FROM recipesapp.categories;`, (error, result, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDifficultyLevels = async () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(`SELECT * FROM recipesapp.difficulty_levels;`, (error, result, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const createRecipe = async (
  userId,
  title,
  description,
  source,
  sourceUrl,
  yield,
  prepTime,
  difficultyLevel,
  img
) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        "INSERT INTO recipesapp.recipes \
        (user_id, title, description, source, source_url, yield, prep_time, difficulty, image_url)\
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [userId, title, description, source, sourceUrl, yield, prepTime, difficultyLevel, img],

        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

const addIngredients = async (recipeId, ingredients) => {
  return new Promise((resolve, reject) => {
    try {
      ingredients.forEach((ingredient) => {
        const { note, amount, unitId } = ingredient;
        db.query(
          "INSERT INTO recipesapp.ingredients\
         ( recipe_id, note , amount, unit_id)\
          VALUES (?,?,?,?)",
          [recipeId, note, amount, unitId],
          (error, result, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
    } catch (e) {
      reject(e);
    }
  });
};

const addInstructions = async (recipeId, instructions) => {
  return new Promise((resolve, reject) => {
    try {
      instructions.forEach((instruction) => {
        db.query(
          "INSERT INTO recipesapp.instructions\
          (recipe_id, instruction)\
          VALUES (?,?)",
          [recipeId, instruction],
          (error, result, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
    } catch (e) {
      reject(e);
    }
  });
};

const addDiets = async (recipeId, diets) => {
  return new Promise((resolve, reject) => {
    try {
      diets.forEach((dietId) => {
        db.query(
          "INSERT INTO recipesapp.recipes_diets\
          (recipe_id, diet_id)\
          VALUES (?,?)",
          [recipeId, dietId],
          (error, result, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
    } catch (e) {
      reject(e);
    }
  });
};

const addCategories = async (recipeId, categories) => {
  return new Promise((resolve, reject) => {
    try {
      categories.forEach((categoryId) => {
        db.query(
          "INSERT INTO recipesapp.recipes_categories\
          (recipe_id, category_id)\
          VALUES (?,?)",
          [recipeId, categoryId],
          (error, result, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  signup,
  login,
  updateDetails,
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
};

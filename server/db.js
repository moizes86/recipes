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
        `INSERT INTO recipesapp.users (username, email, password) VALUES 
      ('${username}','${email}','${password}')`,
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            //if needed - map the result to the required json
            resolve(result);
          }
        }
      );
    } catch (e) {}
  });
};

const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        `SELECT * FROM recipesapp.users WHERE (email='${email}' AND password='${password}')`,
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    } catch (e) {}
  });
};

const updateDetails = async (id, username, password) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        `UPDATE recipesapp.users SET username = '${username}', password='${password}' WHERE id = ${id};`,
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    } catch (e) {}
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
    } catch (e) {}
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

const getDietTypes = async () => {
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

const getMealTypes = async () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(`SELECT * FROM recipesapp.meals;`, (error, result, fields) => {
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
        `INSERT INTO recipesapp.recipes ( 
      user_id, title, description, source, source_url, yield, prep_time, difficulty, image_url
      )
      VALUES 
      (${userId}, '${title}', '${description}', '${source}', '${sourceUrl}', ${yield}, ${prepTime}, ${difficultyLevel}, '${img}');`,

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

// const addIngredients_query = `INSERT INTO recipesapp.ingredients (note, recipe_id, unit_id)
//   VALUES ('${note}', ${recipe_id}, ${unit_id});
// `;

module.exports = {
  signup,
  login,
  updateDetails,
  getRecipes,
  getMeasuringUnits,
  getDietTypes,
  getMealTypes,
  getDifficultyLevels,
  createRecipe,
};

const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "recipesapp",
});

db.connect((error) => {
  if (error) throw err;
  console.log("DB Connected!");
});

const signup = async (email, username, password) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        `INSERT INTO users (username, email, password) VALUES 
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

const login = async (email,password) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        `SELECT * FROM recipesapp.users WHERE (email='${email}' AND password='${password}')`,
        (error, result, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(result;
          }
        }
      );
    } catch (e) {}
  });
}

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

// const getRecipes = async()=>{
//   return new Promise((resolve, reject)=>{
//     try {
//       db.query(
//         `UPDATE recipesapp.users SET username = '${username}', password='${password}' WHERE id = ${id};`,
//         (error, result, fields) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//     } catch (e) {

//     })
  
  


// db.signup = signup;

// module.exports = db;

module.exports = { signup, login, updateDetails };

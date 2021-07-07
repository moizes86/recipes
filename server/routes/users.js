const express = require("express");
const { usersAPI } = require("../DAL/db");
const router = express.Router();
const { validationsAPI } = require("../DAL/validations");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST user signup */
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;
    validationsAPI.email(email);
    validationsAPI.username(username);
    validationsAPI.password(password);
    validationsAPI.confirmPassword(confirmPassword, password);

    const [result] = await usersAPI.signup(email, username, password);
    if (!result.insertId) res.status(500).json(result.message)
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

/* Login */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    validationsAPI.email(email);
    validationsAPI.password(password);

    const [result] = await usersAPI.login(email, password);
    if (!result.length) res.status(500).json({ err: "Username or password incorrect" });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

/* Update user's details */
router.put("/update-details", async (req, res) => {
  try {
    const { id, username, password, confirmPassword } = req.body;

    validationsAPI.username(username);
    validationsAPI.password(password);
    validationsAPI.confirmPassword(confirmPassword, password);

    const [result] = await usersAPI.updateDetails(id, username, password);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = router;

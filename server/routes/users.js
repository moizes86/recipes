const express = require("express");
const { signup, login, updateDetails } = require("../db");
const router = express.Router();
const {
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} = require("../../validations");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST user signup */
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;
    validateEmail(email);
    validateUsername(username);
    validatePassword(password);
    validateConfirmPassword(confirmPassword, password);

    const result = await signup(email, username, password);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

/* Login */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    validateEmail(email);
    validatePassword(password);

    const result = await login(email, password);
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

    validateUsername(username);
    validatePassword(password);
    validateConfirmPassword(confirmPassword, password);

    const result = await updateDetails(id, username, password);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = router;

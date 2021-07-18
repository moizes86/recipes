const express = require("express");
const router = express.Router();

const { usersAPI } = require("../DAL/db");
const { validationsAPI } = require("../DAL/validations");
const { LoginValidationError } = require("../DAL/Errors");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST user signup */
router.post("/signup", async (req, res) => {
  try {
    const {
      values: { email, username, password, confirmPassword },
    } = req.body;
    validationsAPI.email(email);
    validationsAPI.username(username);
    validationsAPI.password(password);
    validationsAPI.confirmPassword(confirmPassword, password);

    const [result] = await usersAPI.signup(email, username, password);
    if (!result.insertId) {
      res.status(500).json(result);
    } else {
      res.status(200).json(result);
    }
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

    const [user] = await usersAPI.login(email, password);
    res.cookie("user", user);
    res.status(200).json(user);
  } catch (e) {
    if (e instanceof LoginValidationError) {
      res.status(400).json({ err: "Invalid email or password" });
      return;
    }
    res.status(500).json({ err: e.message });
  }
});

router.get("/login", async (req, res) => {
  if (req.cookies.user) {
    res.status(200).send(req.cookies.user[0]);
  } else res.status(400).send("Not signed in");
});

router.post("/logout", async (req, res) => {
  res.clearCookie("user");
  res.status(200).send("Logged out");
});

/* Update user's details */
router.put("/update-details", async (req, res) => {
  try {
    const { id, username, password, confirmPassword } = req.body;

    validationsAPI.username(username);
    validationsAPI.password(password);
    validationsAPI.confirmPassword(confirmPassword, password);

    const [result] = await usersAPI.updateDetails(id, username, password);
    res.status(200).json({ id, username, password, confirmPassword });
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = router;

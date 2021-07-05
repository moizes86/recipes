const express = require("express");
const { signup, login, updateDetails } = require("../db");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST user signup */
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const result = await signup(email, username, password);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

/* GET user by id or email and password. */
/* Login */
router.post("/login", async (req, res) => {
  try {
    const { id, email, password } = req.body;
    const result = await login(id, email, password);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

/* Update user's details */
router.put("/update-details", async (req, res) => {
  try {
    const { id, username, password } = req.body;
    const result = await updateDetails(id, username, password);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = router;

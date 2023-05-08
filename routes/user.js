const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const userController = require("../controllers/user");

router.get("/me", auth, userController.getCurrentUser);

router.post("/signup", userController.createUser);

router.post("/login", userController.loginUser);

module.exports = router;

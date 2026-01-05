const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const { createUserValidator } = require("../validator/UserValidator");

router.post("/", createUserValidator, userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;

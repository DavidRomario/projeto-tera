const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/", usersController.createUser);
router.get("/:id", usersController.getUserById);
router.get("/", usersController.getUsers);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);
module.exports = router;

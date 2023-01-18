const express = require("express");
const router = express.Router();
const jwt = require("../middleware/jwt");
const cartController = require("../controllers/cartController");

router.use(jwt);
router.get("/:id", cartController.getCart);
router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCart);
router.put("/remove/:id", cartController.removeProductFromCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;

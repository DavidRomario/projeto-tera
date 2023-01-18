const express = require("express");
const router = express.Router();
const jwt = require("../middleware/jwt");
const orderController = require("../controllers/orderController");

router.use(jwt);
router.get("/:id", orderController.getOrdersByUserId);
router.post("/", orderController.createOrder);

module.exports = router;

const express = require("express");
const router = express.Router();
const jwt = require("../middleware/jwt");
const paymentController = require("../controllers/paymentController");

router.use(jwt);
router.post("/", paymentController.submitPayment);

module.exports = router;

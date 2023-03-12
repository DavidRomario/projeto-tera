const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.post("/", loginController.login);
router.post("/recovery", loginController.recoveryPassword);
router.get("/verify-hash/:hash", loginController.getVerifyHash);
router.put("/redefine/:hash", loginController.updatePassword);

module.exports = router;

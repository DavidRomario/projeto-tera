const models = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET
  ? process.env.SECRET
  : "skaiokaopskalsoaksosoakspokkofiashiufasnieql";

async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await models.User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        payload: [],
      });
    }

    const comparePassword = await bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Incorret email or password",
        payload: [],
      });
    }

    const token = await jwt.sign({ payload: new Date() }, SECRET);
    user.token = token;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      payload: [user],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error on api",
      payload: [],
    });
  }
}

module.exports = { login };

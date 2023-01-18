const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET
  ? process.env.SECRET
  : "skaiokaopskalsoaksosoakspokkofiashiufasnieql";

module.exports = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Error on header",
        payload: [],
      });
    }

    jwt.verify(token, SECRET, (err) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Not authorized",
          payload: [],
        });
      }
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Not authorized",
      payload: [],
    });
  }
};

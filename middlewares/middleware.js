// auth isStudent isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    //extract jwt token
    const { token } = req.body;
    if (!token) {
      return res.json({
        success: false,
        message: `token is not avilable`,
      });
    }
    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `token is not veryfied`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `auth error`,
    });
  }

  next();
};

//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role != "Student") {
      return res.status(400).json({
        success: false,
        message: `this is protected for student`,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `user role can not matching`,
    });
  }
};
//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role != "Admin") {
      return res.status(400).json({
        success: false,
        message: `this is protected for Admin`,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `user role can not matching`,
    });
  }
};

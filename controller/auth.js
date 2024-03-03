const bcrypt = require("bcrypt");

const User = require(`../model/user`);
const jwt = require("jsonwebtoken");
const { options } = require("../routes/user");
require("dotenv").config();
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    //if user already exists
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
      //encrypt the password
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: `user created successfully`,
    });
  } catch (error) {
    console.log("error occur during created new user");
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `cannot create user `,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `please fill all fields`,
      });
    }
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `user not registered`,
      });
    }
    // verify password and genrate jwt token
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      // user = user.toObject();
      user.token = token;
      user.password = undefined;
      // await user.save();

      // //cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `user loggied in successfully`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `password not match`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `loggin failure`,
    });
  }
};

const express = require("express");
const db = require("./config/dnConnect");
const app = express();

app.use(express.json());
require("dotenv").config();
const user = require("./routes/user");
// const { findOne } = require("./model/user");
app.use("/api/v1", user);
db();
app.listen(process.env.PORT, () => {
  console.log(`app is running on ${process.env.PORT}`);
});

//signup
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, role, password } = req.body;
//     const existinguisher = await User.findOne({ email });
//     if (existinguisher) {
//       return res.status(200).json({
//         success: false,
//         message: `user already exist`,
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const createDb = await user.create({ email, password });
//     return res.status(200).json({
//       success: true,
//       message: `user created successfully`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `please all field correcrly`,
//     });
//   }
// };
//login
// exports.login = async (req, res) => {
//   try {
//     const { password, email } = req.body;

//     if (!email || !password) {
//       return res.status(500).json({
//         success: false,
//         message: `please fill corerct mail & password`,
//       });
//     }
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(500).json({
//         success: false,
//         message: `firstly please do signup`,
//       });
//     }

//     const payload = {
//       email: user.email,
//       id: user._id,
//       role: user.role,
//     };
//     if (await bcrypt.compare(password, user.password)) {
//       const token = jwt.sign(payload, process.env.DB_SECRETKEY, {
//         expireIn: "2h",
//       });
//       user.token = token;
//       user.password = undefined;
//       // create a cookie
//       const newDate = new Date(Date.now() + 3 * 60 * 60 + 1000);

//       res.cookie("cookies", cookie, option).status(200).json({
//         success: true,
//         message: `cookie added successfully`,
//         token,
//         user,
//       });
//     } else {
//       return res.status(200).json({
//         success: true,
//         message: `eror during logging`,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `please signup firstly or issue during login process`,
//     });
//   }
// };

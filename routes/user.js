const express = require("express");
const router = express.Router();
const { signup, login } = require("../controller/auth");
const { auth, isStudent, isAdmin } = require("../middlewares/middleware");
router.post("/login", login);
router.post("/signup", signup);

//protected router
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: `welcome to auth route`,
  });
});
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: `welcome to student route`,
  });
});
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: `welcome to admin route`,
  });
});
module.exports = router;

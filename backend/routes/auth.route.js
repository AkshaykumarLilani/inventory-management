const { signUpUser, loginUser, logoutUser } = require("../controllers/auth.controller");


const router = require("express").Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
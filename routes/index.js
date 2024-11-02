const router = require("express").Router();

const Car = require("./carRouter");
const User = require("./userRouter");
const Auth = require("./authRouter");

router.use("/car", Car);
router.use("/user", User);
router.use("/auth", Auth);

module.exports = router;

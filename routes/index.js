const router = require("express").Router();

const Shop = require("./shopRouter");
const Car = require("./carRouter");
const User = require("./userRouter");

router.use("/api/v1/shops", Shop);
router.use("/api/v1/car", Car);
router.use("/api/v1/user", User);

module.exports = router;

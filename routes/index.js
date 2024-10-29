const router = require("express").Router();

const Shop = require("./shopRouter");
const Car = require("./carRouter");

router.use("/api/v1/shops", Shop);
router.use("/api/v1/car", Car);

module.exports = router;

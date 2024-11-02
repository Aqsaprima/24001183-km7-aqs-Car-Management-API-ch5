const router = require("express").Router();

const authController = require("../controllers/authsController");

router.post("/login", authController.login);
router.get("/", authController.getAllAuth);

module.exports = router;

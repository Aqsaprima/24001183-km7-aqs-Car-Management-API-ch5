const router = require("express").Router();

const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

router.post("/admin", authenticate, userController.createUser);
router.post("", userController.register);
router.get("/current", authenticate, userController.getCurrentUser);
router.get("", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;

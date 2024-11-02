const router = require("express").Router();

const carController = require("../controllers/carController");
const authenticate = require("../middleware/authenticate");
const role = require("../middleware/role");

router.use(authenticate, role);

router.post("", carController.createCar);
router.get("", carController.getAllCar);
router.get("/:id", carController.getCarById);
router.patch("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;

module.exports = async (req, res, next) => {
  try {
    const role = req.user.role;
    if (role == "admin" || req.user.role == "superAdmin") {
      next();
    } else {
      return res.status(400).json({
        status: "Failed",
        message: "you are not logged as admin or super admin",
        isSuccess: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

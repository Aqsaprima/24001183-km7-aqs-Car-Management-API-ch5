const { Users } = require("../models");

const getAllUser = async (req, res) => {
  try {
    const users = await Users.findAll();

    res.status(200).json({
      status: "Success",
      message: "Success get cars data",
      isSuccess: true,
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error.name);
    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = {
  getAllUser,
};

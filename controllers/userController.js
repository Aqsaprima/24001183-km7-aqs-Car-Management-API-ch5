const { Users } = require("../models");

const getCurrentUser = async (req, res) => {
  console.log(req.user);
  try {
    const user = await Users.findOne({
      where: {
        id: req.user.userId,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "this is the account currently logged in",
      isSuccess: true,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const register = async (req, res) => {
  const { name, age, address } = req.body;
  try {
    const newUser = await Users.create({
      name,
      age,
      address,
      role: "member",
    });
    res.status(200).json({
      status: "Success",
      message: "Successfully add new member",
      isSuccess: true,
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const createUser = async (req, res) => {
  const { name, age, address, role } = req.body;

  if (role) {
    if (role == "superAdmin") {
      return res.status(400).json({
        status: "Failed",
        message: "cannot add Super Admin",
        isSuccess: false,
        data: null,
      });
    } else if (role == "admin" && req.user.role != "superAdmin") {
      return res.status(400).json({
        status: "Failed",
        message: "only Super Admin can add admin",
        isSuccess: false,
        data: null,
      });
    }
  }

  try {
    const newUser = await Users.create({
      name,
      age,
      address,
      role,
    });

    res.status(201).json({
      status: "Success",
      message: "Success create new User",
      isSuccess: true,
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await Users.findAll();

    res.status(200).json({
      status: "Success",
      message: "Success get users data",
      isSuccess: true,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Users.findOne({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Success get user data",
      isSuccess: true,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, age, address, role } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "Fail",
        message: "Data not found",
        isSuccess: false,
        data: null,
      });
    }

    await user.update({
      name,
      age,
      address,
      role,
    });

    res.status(200).json({
      status: "Success",
      message: "Success update user",
      isSuccess: true,
      data: {
        user: {
          id,
          name,
          age,
          address,
          role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Users.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "Fail",
        message: "Data not found",
        isSuccess: false,
        data: null,
      });
    }

    await user.destroy();

    res.status(200).json({
      status: "Success",
      message: "Success delete user",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  register,
  getCurrentUser,
};

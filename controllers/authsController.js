const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auths, Users } = require("../models");

const getAllAuth = async (req, res) => {
  try {
    const { page, size } = req.query;

    const pageSize = parseInt(size) || 10;
    const pageNum = parseInt(page) || 1;
    const offset = (pageNum - 1) * pageSize;

    const auths = await Auths.findAll({
      include: [
        {
          model: Users,
          as: "user",
        },
      ],
      limit: pageSize,
      offset,
    });

    res.status(200).json({
      status: "Success",
      message: "Success get auth data",
      isSuccess: true,
      data: {
        pagination: {
          currentPage: pageNum,
          limit: pageSize,
        },
        auths,
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await Auths.findOne({
      include: [
        {
          model: Users,
          as: "user",
        },
      ],
      where: {
        email,
      },
    });

    console.log(data);
    if (!data) {
      return res.status(401).json({
        status: "Failed",
        message: "Email not registered",
        isSuccess: false,
        data: null,
      });
    }

    if (data && bcrypt.compareSync(password, data.password)) {
      const token = jwt.sign(
        {
          id: data.id,
          userId: data.user.id,
          role: data.user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRED,
        }
      );

      res.status(200).json({
        status: "Success",
        message: "login success",
        isSuccess: true,
        data: {
          username: data.user.name,
          token,
        },
      });
    } else {
      res.status(401).json({
        status: "Failed",
        message: "password incorrect",
        isSuccess: false,
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = {
  login,
  getAllAuth,
};

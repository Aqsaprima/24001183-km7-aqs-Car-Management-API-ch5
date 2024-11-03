const { Cars, Users } = require("../models");

const createCar = async (req, res) => {
  const { model, type, price } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        id: req.user.userId,
      },
    });

    const newCars = await Cars.create({
      model,
      type,
      price,
      createdBy: user.name,
    });

    res.status(201).json({
      status: "Success",
      message: "Success create new cars",
      isSuccess: true,
      data: {
        newCars,
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

const getAllCar = async (req, res) => {
  try {
    const cars = await Cars.findAll();

    res.status(200).json({
      status: "Success",
      message: "Success get cars data",
      isSuccess: true,
      data: {
        cars,
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

const getCarById = async (req, res) => {
  const id = req.params.id;

  try {
    const car = await Cars.findOne({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Success get car data",
      isSuccess: true,
      data: {
        car,
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

const updateCar = async (req, res) => {
  const id = req.params.id;
  const { model, type, price } = req.body;

  try {
    const car = await Cars.findOne({
      where: {
        id,
      },
    });

    const user = await Users.findOne({
      where: {
        id: req.user.userId,
      },
    });

    if (!car) {
      return res.status(404).json({
        status: "Fail",
        message: "Data not found",
        isSuccess: false,
        data: null,
      });
    }

    await car.update({
      model,
      type,
      price,
      updatedBy: user.name,
    });

    res.status(200).json({
      status: "Success",
      message: "Success update car",
      isSuccess: true,
      data: {
        car: {
          id,
          model,
          type,
          price,
        },
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

const deleteCar = async (req, res) => {
  const id = req.params.id;

  try {
    const car = await Cars.findOne({
      where: {
        id,
      },
    });

    if (!car) {
      return res.status(404).json({
        status: "Fail",
        message: "Data not found",
        isSuccess: false,
        data: null,
      });
    }

    await car.destroy();

    res.status(200).json({
      status: "Success",
      message: "Success delete product",
      isSuccess: true,
      data: null,
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
  createCar,
  getAllCar,
  getCarById,
  updateCar,
  deleteCar,
};

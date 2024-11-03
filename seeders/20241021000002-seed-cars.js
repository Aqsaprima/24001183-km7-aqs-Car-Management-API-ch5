"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const cars = [];

    for (let i = 0; i < 30; i++) {
      cars.push({
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        price: parseFloat(faker.commerce.price(15000, 50000, 2)),
        createdBy: faker.helpers.arrayElement(["system"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Cars", cars, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  },
};

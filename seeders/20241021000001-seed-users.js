"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.name.fullName(),
        age: faker.number.int({ min: 10, max: 30 }),
        address: faker.address.streetAddress(),
        role: faker.helpers.arrayElement(["superAdmin"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.name.fullName(),
        age: faker.number.int({ min: 10, max: 30 }),
        address: faker.address.streetAddress(),
        role: faker.helpers.arrayElement(["admin"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.name.fullName(),
        age: faker.number.int({ min: 10, max: 30 }),
        address: faker.address.streetAddress(),
        role: faker.helpers.arrayElement(["member"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

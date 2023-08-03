'use strict';
const resturant_lists = require('../public/jsons/restaurant.json').results

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Lists', resturant_lists.map((list) =>
    (
      {
        ...list, //list的key與table屬性名稱相同
        createdAt: new Date(),
        updatedAt: new Date()
      }
    )
    ))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Lists', null)
  }
};

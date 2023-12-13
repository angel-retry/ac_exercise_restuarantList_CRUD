'use strict';
const resturant_lists = require('../public/jsons/restaurant.json').results
const bcryptjs = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let transaction
    try {
      transaction = await queryInterface.sequelize.transaction()
      //加密密碼
      const hash = await bcryptjs.hash('12345678', 10)

      //新增使用者資料
      await queryInterface.bulkInsert('Users', [{
        id: 1,
        name: 'user1',
        email: 'user1@example.com',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()

      }, {
        id: 2,
        name: 'user2',
        email: 'user2@example.com',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
      }],
        { transaction }
      )

      //新增餐廳資料
      await queryInterface.bulkInsert('Lists', resturant_lists.map((list) =>
      (
        {
          ...list, //list的key與table屬性名稱相同
          userId: list.id <= 4 ? 1 : 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      )
      ),
        { transaction }
      )

      await transaction.commit()

    } catch (error) {
      if (transaction) {
        transaction.rollback()
      }
    }

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Lists', null)
    await queryInterface.bulkDelete('Users', null)
  }
};

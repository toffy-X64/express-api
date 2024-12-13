const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);

    await queryInterface.bulkInsert('Users', [
      { 
        username: 'admin', 
        email: 'admin@gmail.com', 
        password: await bcrypt.hash('qwe123qwe', salt), 
        roleId: 1, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        username: 'toffy', 
        email: 'toffy@gmail.com', 
        password: await bcrypt.hash('qwe123qwe', salt), 
        roleId: 2, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

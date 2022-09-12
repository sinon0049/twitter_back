'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'user1@example.com',
        password: '12345678',
        account: 'user1',
        name: 'user1',
        avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
        introduction: 'Hi, I\'m user1!',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'user2@example.com',
        password: '12345678',
        account: 'user2',
        name: 'user2',
        avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
        introduction: 'Hi, I\'m user2!',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        email: 'user3@example.com',
        password: '12345678',
        account: 'user3',
        name: 'user3',
        avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
        introduction: 'Hi, I\'m user3!',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        email: 'root@example.com',
        password: '12345678',
        account: 'root',
        name: 'root',
        avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
        introduction: 'Hi, I\'m root!',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};

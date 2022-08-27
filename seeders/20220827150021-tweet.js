'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tweets', [
      {
        id: 1,
        UserId: 1,
        description: 'This is the first from user1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        UserId: 1,
        description: 'This is the second from user1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        UserId: 1,
        description: 'This is the third from user1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        UserId: 2,
        description: 'This is the first from user2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        UserId: 2,
        description: 'This is the second from user2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        UserId: 2,
        description: 'This is the third from user2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        UserId: 3,
        description: 'This is the first from user3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        UserId: 3,
        description: 'This is the second from user3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        UserId: 3,
        description: 'This is the third from user3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tweets', null, {})
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Replies', [
      {
        id: 1,
        UserId: 1,
        TweetId: 1,
        comment: 'user1 reply first from user1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        UserId: 1,
        TweetId: 4,
        comment: 'user1 reply first from user2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        UserId: 1,
        TweetId: 7,
        comment: 'user1 reply first from user3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        UserId: 2,
        TweetId: 2,
        comment: 'user2 reply second from user1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        UserId: 2,
        TweetId: 5,
        comment: 'user2 reply second from user2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        UserId: 2,
        TweetId: 8,
        comment: 'user2 reply second from user3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        UserId: 3,
        TweetId: 3,
        comment: 'user3 reply third from user1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        UserId: 3,
        TweetId: 6,
        comment: 'user3 reply third from user2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        UserId: 3,
        TweetId: 9,
        comment: 'user3 reply third from user3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Replies', null, {})
  }
};

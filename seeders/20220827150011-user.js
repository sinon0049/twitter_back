'use strict';
const bcrypt = require('bcrypt')

async function generateSeedPassword() {
  const password = '12345678'
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)
  
  return hashedPassword
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pwd = await generateSeedPassword()
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'user1@example.com',
        password: pwd,
        account: 'user1',
        name: 'user1',
        avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
        cover: 'https://i.imgur.com/3koYUBD.jpg',
        introduction: 'Hi, I\'m user1!',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'user2@example.com',
        password: pwd,
        account: 'user2',
        name: 'user2',
        avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
        cover: 'https://i.imgur.com/3koYUBD.jpg',
        introduction: 'Hi, I\'m user2!',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        email: 'user3@example.com',
        password: pwd,
        account: 'user3',
        name: 'user3',
        avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
        cover: 'https://i.imgur.com/3koYUBD.jpg',
        introduction: 'Hi, I\'m user3!',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        email: 'root@example.com',
        password: pwd,
        account: 'root',
        name: 'root',
        avatar: 'https://avatars.githubusercontent.com/u/8667311?s=200&v=4',
        cover: 'https://i.imgur.com/3koYUBD.jpg',
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

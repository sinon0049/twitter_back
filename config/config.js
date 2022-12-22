require('dotenv').config();
module.exports = {
    "development": {
        "username": "root",
        "password": "password",
        "database": "ac_twitter_workspace",
        "host": "127.0.0.1",
        "dialect": "mysql",
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DBNAME,
        "host": process.env.DB_HOST,
        "dialect": "mysql",
      }
};  
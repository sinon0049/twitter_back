require('dotenv').config();
module.exports = {
    "development": {
        "username": "root",
        "password": "password",
        "database": "ac_twitter_workspace",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": process.env.RENDER_USER,
        "password": process.env.RENDER_PASSWORD,
        "database": process.env.RENDER_DBNAME,
        "host": process.env.RENDER_HOST,
        "dialect": "postgres",
        "port": process.env.RENDER_PORT
      }
};  
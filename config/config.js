require('dotenv').config();
module.exports = {
    "development": {
        "username": "root",
        "password": process.env.RENDER_PASSWORD,
        "database": "test",
        "host": process.env.RENDER_HOST,
        "dialect": "postgres",
        "port": process.env.RENDER_PORT
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": process.env.FREEDB_USER,
        "password": process.env.FREEDB_PASSWORD,
        "database": process.env.FREEDB_DBNAME,
        "host": process.env.FREEDB_HOST,
        "dialect": "mysql",
        "port": process.env.FREEDB_PORT
      }
};  
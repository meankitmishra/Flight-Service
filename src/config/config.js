const dotenv = require('dotenv');
const path = require('path');

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports= {
  development: {
    username: "postgres", // change this as per your local setup
    password: "" ,
    database: "Flights",
    host: "127.0.0.1",
    dialect: 'postgres'
  },
  test: {
    username: "postgres", // change this as per your local setup
    password: "" ,
    database: "Flights",
    host: "127.0.0.1",
    dialect: 'postgres'
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    }
  }
}

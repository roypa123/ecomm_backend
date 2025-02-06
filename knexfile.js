const dotenv = require('dotenv');
const path = require('path');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, envFile) });

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};



// module.exports = {
//     client: 'pg',
//     connection: {
//       host: "127.0.0.1",
//       user: 'postgres',
//       password: 'password',
//       database: 'mobikul',
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './migrations',
//     },
//   };
  
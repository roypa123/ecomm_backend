// // knexfile.js
// module.exports = {
//     client: 'pg',
//     connection: {
//       //host: '164.52.200.24',
//       user: 'postgres',
//       password: 'password',
//       database: 'mobikul',
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: './migrations',
//     },
//   };

module.exports = {
    client: 'pg',
    connection: {
      host: "127.0.0.1",
      user: 'postgres',
      password: 'password',
      database: 'mobikul',
    },
    //pool: { min: 0, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  };
  
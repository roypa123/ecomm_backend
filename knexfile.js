// knexfile.js
module.exports = {
    client: 'pg',
    connection: {
      //host: '164.52.200.24',
      user: 'postgres',
      password: 'password',
      database: 'mobikul',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  };
  
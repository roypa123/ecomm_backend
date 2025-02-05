module.exports = {
    client: 'pg',
    connection: {
      host: "127.0.0.1",
      user: 'postgres',
      password: 'password',
      database: 'mobikul',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  };
  
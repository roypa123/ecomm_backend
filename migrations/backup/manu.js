/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("user", function (table) {
        table.bigIncrements("user_id").primary();
        table.string("name").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.string("profile_image");
        table.string("role").defaultTo("USER");
        table.string("access_token");
        table.string("refresh_token");
        table.string("otp_create_account");
        table.integer("status").defaultTo(0);
        table.bigInteger('created_at').defaultTo(knex.raw('extract(epoch from now()) * 1000'));
        table.bigInteger('updated_at').defaultTo(knex.raw('extract(epoch from now()) * 1000'));
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("user");
};
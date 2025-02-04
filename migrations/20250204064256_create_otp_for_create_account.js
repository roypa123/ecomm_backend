/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("otp_for_createaccount", function (table) {
      table.bigIncrements("id").primary();
      table.bigInteger("user_id").notNullable();
      table.string("otp_for_create_acount").unique().notNullable();
      table.bigInteger("expiry_at").notNullable();
      table.foreign("user_id").references("user.user_id");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("otp_for_createaccount");
  };


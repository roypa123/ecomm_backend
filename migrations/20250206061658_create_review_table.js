/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('reviews', table => {
      table.bigInteger('id').primary().unsigned().notNullable();
      table.bigInteger('product_id').unsigned().notNullable();
      table.bigInteger('user_id').unsigned().notNullable();
      table.integer('stars').notNullable().checkBetween([1, 5]); // 1-5 rating
      table.text('review_text').notNullable();
      table.timestamps(true, true);
  
      table.foreign('product_id').references('products.id').onDelete('CASCADE');
      table.foreign('user_id').references('user.user_id').onDelete('CASCADE'); // Ensure user exists
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('reviews');
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('categories', (table) => {
        table.bigIncrements('id').primary();
        table.string('name').notNullable().unique();
        table.string('category_image').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .createTable('subcategories', (table) => {
        table.bigIncrements('id').primary();
        table.string('name').notNullable();
        table.bigInteger('category_id').notNullable().references('id').inTable('categories').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .createTable('types', (table) => {
        table.bigIncrements('id').primary();
        table.string('name').notNullable();
        table.bigInteger('subcategory_id').notNullable().references('id').inTable('subcategories').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('types')
      .dropTableIfExists('subcategories')
      .dropTableIfExists('categories');
  };

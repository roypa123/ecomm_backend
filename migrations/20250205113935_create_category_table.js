/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('categories', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable().unique();
        table.string('category_image').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .createTable('subcategories', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.uuid('category_id').references('id').inTable('categories').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
      .createTable('types', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.uuid('subcategory_id').references('id').inTable('subcategories').onDelete('CASCADE');
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

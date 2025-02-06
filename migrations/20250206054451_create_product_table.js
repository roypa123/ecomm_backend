/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
      table.bigIncrements('id').primary();
      table.bigInteger('categories_id').notNullable();
      table.bigInteger('subcategories_id').notNullable();
      table.bigInteger('types_id').notNullable();
      table.string('product_name').notNullable();
      table.text('product_description');
      table.string('product_image_url_1');
      table.string('product_image_url_2');
      table.string('product_image_url_3');
      table.decimal('real_price', 10, 2).notNullable();
      table.decimal('max_price', 10, 2).notNullable();
      table.integer('stock').defaultTo(0);
      table.timestamps(true, true)
      table.foreign("categories_id").references("categories.id").onDelete('CASCADE');
      table.foreign("subcategories_id").references("subcategories.id").onDelete('CASCADE');
      table.foreign("types_id").references("types.id").onDelete('CASCADE');
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('products');
};

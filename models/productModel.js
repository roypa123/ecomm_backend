const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);

class ProductModel {
    static async getProductsBySubcategory(data, pagination) {
        const pageSize = pagination.size;
        const currentPage = pagination.page;
        const subcategory_id = data;

        try {
            const offset = currentPage * pageSize;
            const products = await knex("products")
                .where({ subcategories_id: subcategory_id })
                .select(
                    "id",
                    "product_name",
                    "product_image_url_1",
                    "real_price",
                    "max_price",
                )
                .offset(offset)
                .limit(pageSize);

            const countQuery = await knex("products")
                .count("*")
                .where({ subcategories_id: subcategory_id })
                .first();

            const totalCategories = parseInt(countQuery.count);
            const totalPages = Math.ceil(totalCategories / pageSize);

            return {
                content: products,
                totalPages,
                totalElements: totalCategories,
                currentPage,
                pageSize,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

module.exports = ProductModel;
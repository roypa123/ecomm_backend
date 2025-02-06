const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);
const { RequestVO,
    PaginationVO,
    FilterVo,
    SortVo,
    OrderVo, } = require("../vo/requestVo");
const cloudinary = require('../configuration/cloudinaryConfig');
const { ResponseVO, PaginationResVO, ErrorVO } = require("../vo/responseVo");
const ProductModel = require("../models/productModel");



class ProductController {

    static async createProduct(req, res) {
        const productData = req.body;

        try {
            if (!productData.product_name
                || !productData.categories_id
                || !productData.subcategories_id
                || !productData.types_id
                || !productData.real_price
                || !productData.max_price
                || !productData.product_description
                || !productData.stock
            ) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Missing required fields",
                    "Missing required fields"
                );
                return res.status(400).json(validationError);
            }

            const categoryExists = await knex("categories").where({ id: productData.categories_id }).first();
            const subcategoryExists = await knex("subcategories").where({ id: productData.subcategories_id }).first();
            const typeExists = await knex("types").where({ id: productData.types_id }).first();



            if (!categoryExists || !subcategoryExists || !typeExists) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Invalid category, subcategory, or type ID",
                    "Invalid category, subcategory, or type ID"
                );
                return res.status(400).json(validationError);
            }

            const productExists = await knex("products").where({ product_name: productData.product_name }).first();
            if (productExists) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Product already exist",
                    "Product already exist"
                );
                return res.status(400).json(validationError);
            }


            let uploadedImages = [null, null, null];
            if (req.files && req.files.length > 0) {
                const cloudinaryUploads = await Promise.all(
                    req.files.map(async (file) => {
                        const uploadResult = await cloudinary.uploader.upload(file.path, {
                            folder: "products",
                            use_filename: true,
                            unique_filename: false,
                        });
                        return uploadResult.secure_url;
                    })
                );
                uploadedImages = [...cloudinaryUploads, ...uploadedImages].slice(0, 3);
            }

            console.log("Uploaded Images:", uploadedImages);
            const product_image_url_1 = uploadedImages[0];
            const product_image_url_2 = uploadedImages[1];
            const product_image_url_3 = uploadedImages[1];

            console.log("hi")


            const result = await knex("products")
                .insert({
                    categories_id: productData.categories_id,
                    subcategories_id: productData.subcategories_id,
                    types_id: productData.types_id,
                    product_name: productData.product_name,
                    product_description: productData.product_description,
                    product_image_url_1: product_image_url_1,
                    product_image_url_2: product_image_url_2,
                    product_image_url_3: product_image_url_3,
                    real_price: productData.real_price,
                    max_price: productData.max_price,
                    stock: productData.stock
                })
                .returning([
                    'id',
                    'categories_id',
                    'subcategories_id',
                    'types_id',
                    'product_name',
                    'product_description',
                    'product_image_url_1',
                    'product_image_url_2',
                    'product_image_url_3',
                    'real_price',
                    'max_price',
                    'stock'
                ]);

            const successResponse = new ResponseVO(200, "Success", "Success", result);
            return res.status(200).json(successResponse);

        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }

    static async getProductsBySubcategory(req, res) {
        try {
            const { subcategory_id } = req.params;
            const { pageNo, pageSize } = req.query;
            const paginationVO = new PaginationVO(pageNo || 0, pageSize || 5);

            const requestVO = new RequestVO({
                data: subcategory_id,
                pagination: paginationVO,
                filter: null,
                sortBy: null,
                orderBy: null,
            });

            if (!subcategory_id) {

                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Subcategory ID is required",
                    "Subcategory ID is required"
                );
                return res.status(400).json(validationError);

            }

            const result = await ProductModel.getProductsBySubcategory(
                requestVO.data,
                requestVO.pagination
            );

            const successResponse = new ResponseVO(200, "Success", "Success", result);
            return res.status(200).json(successResponse);

        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }



    static async getProductsBySubcategory(req, res) {
        try {
            const { subcategory_id } = req.params;
            const { pageNo, pageSize } = req.query;
            const paginationVO = new PaginationVO(pageNo || 0, pageSize || 5);

            const requestVO = new RequestVO({
                data: subcategory_id,
                pagination: paginationVO,
                filter: null,
                sortBy: null,
                orderBy: null,
            });

            if (!subcategory_id) {

                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Subcategory ID is required",
                    "Subcategory ID is required"
                );
                return res.status(400).json(validationError);

            }

            const result = await ProductModel.getProductsBySubcategory(
                requestVO.data,
                requestVO.pagination
            );

            const successResponse = new ResponseVO(200, "Success", "Success", result);
            return res.status(200).json(successResponse);

        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }

    static async addReview(req, res) {
        const reviewData = req.body
        console.log("sasasa");
    
        try {

            if (!reviewData.product_id
                || !reviewData.user_id
                || !reviewData.stars
                || !reviewData.review_text
            ) {

                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Missing required fields",
                    "Missing required fields"
                );
                return res.status(400).json(validationError);

            }

            const productExists = await knex('products').where('id', reviewData.product_id).first();
            if (!productExists) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Product not found.",
                    "Product not found"
                );
                return res.status(400).json(validationError);
            }

            const userExists = await knex('user').where('user_id', reviewData.user_id).first();
            if (!userExists) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "User not found",
                    "User not found"
                );
                return res.status(400).json(validationError);
            }


            if (reviewData.stars < 1 || reviewData.stars > 5) {
                const validationError = new ErrorVO(
                    400,
                    "BAD REQUEST",
                    "Stars must be between 1 and 5",
                    "Stars must be between 1 and 5"
                );
                return res.status(400).json(validationError);
            }

            const result = await knex('reviews').insert({
                id: Date.now(),
                product_id: reviewData.product_id,
                user_id: reviewData.user_id,
                stars: reviewData.stars,
                review_text: reviewData.review_text,
            }).returning('*');

            const successResponse = new ResponseVO(200, "Success", "Success", result);
            return res.status(200).json(successResponse);




        } catch (error) {
            const errorResponse = new ErrorVO(500, "Internal Server Error", "Internal Server Error", error.message);
            res.status(500).json(errorResponse);
        }
    }

}

module.exports = ProductController;
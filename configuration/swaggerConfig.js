const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Specify the version of Swagger/OpenAPI
    info: {
      title: 'Mobikul',
      version: '1.0.0',
      description: 'It is an motivation app',
    },
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);

module.exports = specs;
import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition: swaggerJsdoc.Options["swaggerDefinition"] = {
  openapi: process.env.OPENAPI_VERSION || "3.0.0",
  info: {
    title: process.env.APP_NAME || "Node.js API",
    version: process.env.APP_VERSION || "1.0.0",
    description: process.env.SWAGGER_API_DESCRIPTION,
  },
  servers: [
    {
      url: process.env.BACKEND_URL!,
      description: process.env.SWAGGER_SERVER_DESCRIPTION!,
    },
  ],
  components: {
    securitySchemes: {
      basicAuth: {
        type: "http",
        scheme: "basic",
      },
    },
  },
  security: [
    {
      basicAuth: [],
    },
  ],
};

const swaggerOptions: swaggerJsdoc.Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

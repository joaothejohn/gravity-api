import schemas from "../docs/swaggerDef";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Radius API",
      version: "1.0.0",
    },
    components: {
      schemas,
    },
  },
  apis: ["./src/routes/*.ts"],
};

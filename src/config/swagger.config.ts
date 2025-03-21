import { SwaggerOptions } from 'swagger-ui-express';

const swaggerDefinition: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Blog de Programacion',
      version: '1.0.0',
      description: 'Documentacion de mi API con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
export default swaggerDefinition;

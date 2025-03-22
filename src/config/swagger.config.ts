import { SwaggerOptions } from 'swagger-ui-express';

const swaggerDefinition: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Blog de Programación',
      version: '1.0.0',
      description: 'Documentación de mi API con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        CookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'auth_token', // Nombre de la cookie
          description: 'Token de sesión almacenado en cookies',
        },
      },
    },
    security: [
      {
        CookieAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerDefinition;

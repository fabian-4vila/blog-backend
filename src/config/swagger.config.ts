import { SwaggerOptions } from 'swagger-ui-express';

const serverUrl = `${process.env.SERVER_URL}/api/${process.env.API_VERSION}`;

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
        url: serverUrl,
        description: 'Servidor de Produccion',
      },
    ],
    components: {
      securitySchemes: {
        CookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'auth_token',
          description: 'Token de sesión almacenado en cookies',
        },
      },
    },
    security: [
      {
        CookieAuth: [],
      },
    ],
    tags: [
      { name: 'Server', description: 'Endpoints to verify if the server is running' },
      { name: 'Registration', description: 'Endpoints for user registration' },
      { name: 'Verification', description: 'Endpoints for sending verification emails' },
      { name: 'Authentication', description: 'Endpoints to log in and log out' },
      { name: 'Password Reset', description: 'Endpoints to request and reset user passwords' },
      { name: 'User', description: 'Endpoints for user management' },
      { name: 'Post', description: 'Endpoints for managing posts' },
      { name: 'Post Rating', description: 'Endpoints to manage post ratings' },
      { name: 'Comment', description: 'Endpoints to manage comments' },
      { name: 'Comment Rating', description: 'Endpoints to manage comment ratings' },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerDefinition;

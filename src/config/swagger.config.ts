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
    tags: [
      { name: 'Servidor', description: 'Endpoints para verificar si el servidor está en ejecución' },
      { name: 'Registro', description: 'Endpoints para registrarse' },
      { name: 'Verificacion', description: 'Endpoints para envío de correo de verificación' },
      { name: 'Autenticacion', description: 'Endpoints para iniciar y cerrar sesión' },
      { name: 'Restablecimiento', description: 'Endpoints para solicitar y restablecer la contraseña de usuario' },
      { name: 'Usuarios', description: 'Endpoints para la gestión de usuarios' },
      { name: 'Posteos', description: 'Endpoints para la gestión de publicaciones' },
      { name: 'Calificacion de Posteos', description: 'Endpoints para gestionar las calificaciones de los posts' },
      { name: 'Comentarios', description: 'Endpoints para gestionar los comentarios' },
      {
        name: 'Calificacion de Comentarios',
        description: 'Endpoints para gestionar las calificaciones de los comentarios',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default swaggerDefinition;

import request from 'supertest';
import App from '../app';
import AuthRoute from '../routes/auth.routes';

const appInstance = new App([new AuthRoute()]);
const app = appInstance.getServer(); // Obtiene el servidor sin iniciar listen()

describe('Auth API Tests', () => {
  test('Debe retornar error si las credenciales son incorrectas', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login') // Asegúrate de que este prefijo es correcto
      .send({ email: 'admin@example.com', password: 'wrongpassword' });

    console.log(response.status, response.body); // Depuración
    expect(response.status).toBe(401);
  });
});

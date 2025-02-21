// @ts-ignore
import Sib from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY as string;

const emailApi = new Sib.TransactionalEmailsApi();

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.BASE_URL as string}/verification/verify/${token}`;

  const emailData = {
    sender: { email: 'magno4vila@gmail.com', name: 'Blog Programacion' },
    to: [{ email }],
    subject: 'Verifica tu cuenta',
    htmlContent: `
      <h2>Verificación de Cuenta</h2>
      <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `,
  };

  try {
    await emailApi.sendTransacEmail(emailData);
    console.log(`Correo de verificación enviado a ${email}`);
  } catch (error) {
    console.error('Error enviando correo de verificación:', error);
  }
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.BASE_URL as string}/password-reset/${token}`;

  const emailData = {
    sender: { email: 'magno4vila@gmail.com', name: 'Blog Programacion' },
    to: [{ email }],
    subject: 'Restablecimiento de Contraseña',
    htmlContent: `
      <h2>Restablecimiento de Contraseña</h2>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  };

  try {
    await emailApi.sendTransacEmail(emailData);
    console.log(`Correo de restablecimiento enviado a ${email}`);
  } catch (error) {
    console.error('Error enviando correo de restablecimiento:', error);
  }
};

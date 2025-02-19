// @ts-ignore
import Sib from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY as string;

const emailApi = new Sib.TransactionalEmailsApi();

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.BASE_URL}/auth/verify/${token}`;

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

// emailService.ts
import { emailApi } from '../config/brevoClient';
import dotenv from 'dotenv';

dotenv.config();

const SENDER_EMAIL = process.env.SENDER_EMAIL as string;
const SENDER_NAME = process.env.SENDER_NAME as string;
const BASE_URL = process.env.BASE_URL as string;
const SERVER_URL = process.env.SERVER_URL as string;
/**
 * Enviar correo de verificación
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${SERVER_URL}api/v1/verification/verify/${token}`;

  const emailData = {
    sender: { email: SENDER_EMAIL, name: SENDER_NAME },
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

/**
 * Enviar correo de restablecimiento de contraseña
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${BASE_URL}/password-reset/reset/${token}`;

  const emailData = {
    sender: { email: SENDER_EMAIL, name: SENDER_NAME },
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

// brevoClient.ts
// @ts-ignore
import Sib from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY as string;

export const emailApi = new Sib.TransactionalEmailsApi();

import dotenv from 'dotenv';

dotenv.config();
interface IServerConfig {
  mongoUrl: string;
  port: string;
  token:string;
  host:string;
  secretKey:string;
  customHeaderName: string,
    customHeaderValue: string,
}
const serverConfig: IServerConfig = {
    mongoUrl: process.env.MONGO_URL ?? '',
    port: process.env.PORT ?? '3001',
    token: process.env.JWT_TOKEN ?? '',
    host: process.env.HOST ?? '',
    secretKey: process.env.SECRET_KEY ?? '',
    customHeaderName: process.env.NAME ?? '',
    customHeaderValue: process.env.VALUE ?? '',
};
export { serverConfig, type IServerConfig };

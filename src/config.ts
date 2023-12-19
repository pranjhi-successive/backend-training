import dotenv from 'dotenv';

dotenv.config();
interface IServerConfig {
  mongoUrl: string;
  port: string;
  token:string;
}
const serverConfig: IServerConfig = {
    mongoUrl: process.env.MONGO_URL ?? '',
    port: process.env.PORT ?? '3001',
    token: process.env.JWT_TOKEN ?? '',
};
export { serverConfig, type IServerConfig };

import dotenv from "dotenv";
dotenv.config();
interface IServerConfig {
  mongoUrl: string;
  port: string;
}
const serverConfig: IServerConfig = {
  mongoUrl: process.env.MONGO_URL ?? "",
  port: process.env.PORT ?? "3001",
};
export { serverConfig, type IServerConfig };

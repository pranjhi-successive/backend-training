import dotenv from "dotenv";
dotenv.config();
interface IServerConfig {
  MONGO_URL: string;
}
const serverConfig: IServerConfig = {
  MONGO_URL: process.env.MONGO_URL ?? "",
};
export { serverConfig, type IServerConfig };

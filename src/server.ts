import express from "express";
import router from "./routes/route";

interface ServerConfig {
  port: number;
  host: string;
  secretKey: string;
  customHeaderName: string;
  customHeaderValue: string;
}

class Server {
  private app: express.Application;
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware() {
    this.app.use(express.json());
  }

  private configureRoutes() {
    this.app.use("/", router);
  }

  public listen() {
    this.app.listen(this.config.port, () => {
      console.log(`App listening on port ${this.config.port}`);
    });
  }
}

export default Server;

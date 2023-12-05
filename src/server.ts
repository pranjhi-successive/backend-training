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
  private readonly app: express.Application;
  private readonly config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): any {
    this.app.use(express.json());
  }

  private configureRoutes(): any {
    this.app.use("/", router);
  }

  public listen(): any {
    this.app.listen(this.config.port, () => {
      console.log(`App listening on port ${this.config.port}`);
    });
  }
}

export default Server;

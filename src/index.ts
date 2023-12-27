import Server from "./server";
const port = 3000;
const serverInstance = new Server({
  port: port,
  host: "localhost",
  secretKey: "hello",
  customHeaderName: "hello",
  customHeaderValue: "pranjhi",
});
serverInstance.listen();

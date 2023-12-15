// import { server } from "typescript";
import { serverConfig } from './config';
import Server from './server';

const port = 3000;

const serverInstance = new Server({
    port,
    host: 'localhost',
    secretKey: 'hello',
    customHeaderName: 'hello',
    customHeaderValue: 'pranjhi',
    mongoUrl: serverConfig.mongoUrl,
});

serverInstance.run();
serverInstance.listen();

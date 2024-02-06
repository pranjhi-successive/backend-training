import { serverConfig } from './config';
import Server from './server';

const serverInstance = new Server(serverConfig);
serverInstance.listen();

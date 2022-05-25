import { io } from 'socket.io-client';

const socketClient = io('http://localhost:8888');

export { socketClient };

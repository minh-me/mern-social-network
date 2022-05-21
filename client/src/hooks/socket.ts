import { io } from 'socket.io-client';

const EVENTS = {
  setup: 'set_up',
  connected: 'connected',
  joinChat: 'join_chat',
  newMessage: 'new_message',
  messageReceived: 'message_received',
};

const socketClient = io('http://localhost:8888');

export { socketClient, EVENTS };

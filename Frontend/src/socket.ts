import { io } from 'socket.io-client';
const SOCKET = 8080;

export const socket = io(`http://localhost:${SOCKET}`);
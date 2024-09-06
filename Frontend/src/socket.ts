import { io } from 'socket.io-client';
const SOCKET = 8080;

export const socket = io(`http://localhost:${SOCKET}`, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: Infinity
});


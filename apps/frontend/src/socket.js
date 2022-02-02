import { io } from 'socket.io-client';
require('dotenv').config();


export const socket = io(process.env.SOCKET_URL);

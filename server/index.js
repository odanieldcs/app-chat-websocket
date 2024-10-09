import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.emit('greeting', 'Hello World');
	// TODO: defini os eventos de mensagem
});

server.listen(3000, () => {
	console.log('API listening on *:3000');
});

import * as express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { listen } from './src/websocket/game/initialization';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    listen(socket);
});

io.on('disconnect', (socket) => {
    console.log("todo: end or disconnect or whatever. transferOperatorOrEnd???");
});

app.use(express.static('public'))

const port = process.env["PORT"] || "3000";
const host = process.env["HOST"] || "localhost";
server.listen(port, () => {
    console.log(`Listening on http://${host}:${port}`);
});
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log("connection established");
    socket.on('event', function(){
        // socket.broadcast.emit('joined', {});
        socket.emit('requestedData', {

        });
    });
});

app.use(express.static('public'))

const port = process.env["PORT"] || "3000";
server.listen(port, "0.0.0.0", () => {
    console.log(`Listening on http://localhost:${port}`)
})
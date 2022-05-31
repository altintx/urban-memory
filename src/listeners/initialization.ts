import { Socket } from "socket.io";
import { joinGameMessage } from "./events/join_game";
import { listGamesMessages } from "./events/list_games";
import { loginMessage } from "./events/login";
import { newGameMessage } from "./events/new_game";

function listen(socket: Socket) {
    function wrap(cb: (socket: Socket,message: any) => void) {
        return (json: any) => {
            cb(socket, json);
        }
    }
    socket.on('new_game', wrap(newGameMessage));
    socket.on('login', wrap(loginMessage));
    socket.on('join_game', wrap(joinGameMessage));
    socket.on('list_games', wrap(listGamesMessages));
}

export {
    listen
};

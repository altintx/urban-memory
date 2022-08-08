import { Socket } from "socket.io";
import { helloMessage } from "./events/hello";
import { joinGameMessage } from "./events/join_game";
import { listGamesMessage } from "./events/list_games";
import { loadMapMessage } from "./events/load_map";
import { loginMessage } from "./events/login";
import { newGameMessage } from "./events/new_game";
import { startNextMission } from "./events/start_next_mission";
import { tileInteraction } from "./events/tile_interaction";

function listen(socket: Socket) {
    function wrap(cb: (socket: Socket,message: any) => void) {
        return (json: any) => {
            try {
               cb(socket, json);
            } catch (e) {
                console.error("Uncaught error", e);
            }
        }
    }
    socket.on('new_game', wrap(newGameMessage));
    socket.on('login', wrap(loginMessage));
    socket.on('join_game', wrap(joinGameMessage));
    socket.on('list_games', wrap(listGamesMessage));
    socket.on('load_map', wrap(loadMapMessage));
    socket.on('start_next_mission', wrap(startNextMission));
    socket.on('hello', wrap(helloMessage));
    socket.on('tile_interaction', wrap(tileInteraction));
}

export {
    listen
};

import { Socket } from "socket.io";
import { Operator } from "../../models/characters/operator";
import { actionExecution } from "./events/action_execution";
import { actionIntention } from "./events/action_intention";
import { helloMessage } from "./events/hello";
import { joinGameMessage } from "./events/join_game";
import { listCampaignsMessage } from "./events/list_campaigns";
import { listGamesMessage } from "./events/list_games";
import { loadMapMessage } from "./events/load_map";
import { loginMessage } from "./events/login";
import { newGameMessage } from "./events/new_game";
import { startNextMission } from "./events/start_next_mission";
import { tileInteraction } from "./events/tile_interaction";
import { getOperatorById } from "../../sessions";
export function listen(socket: Socket) {
  const userId = socket.id;
  const uuid = socket.handshake.auth.token;
  function wrap(cb: (socket: Socket, message: any, operator: Operator) => void) {
    return async (json: any) => {
      try {
        const operator = await getOperatorById(userId, uuid);
        if(!operator) console.warn("Unknown operator");
        await cb(socket, json, operator);
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
  socket.on('action_intention', wrap(actionIntention));
  socket.on('action_execution', wrap(actionExecution));
  socket.on('list_campaigns', wrap(listCampaignsMessage));
}


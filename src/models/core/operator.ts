import { randomUUID } from "crypto";
import { Socket } from "socket.io";
import { Game } from "../game";
import { setGame as setSessionGame } from '../../sessions';
type Operator = {
    name: string;
    socket: Socket;
    game: Game | null;
    operatorId: string;
}

function newOperator(socket: Socket, name: string): Operator {
    return {
        name,
        socket,
        game: null,
        operatorId: randomUUID()
    }
}

function setGame(operator: Operator, game: Game): Operator {
    setSessionGame(game);
    operator.game = game;
    console.log("Updated active game");
    return operator;
}

export {
    Operator,
    setGame,
    newOperator
};

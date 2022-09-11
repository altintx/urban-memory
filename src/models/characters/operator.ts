import { Socket } from "socket.io";
import { Game } from "../game";
import { setGame as setSessionGame } from '../../sessions';

export type Operator = {
    name: string;
    socket: Socket;
    game: Game | null;
    operatorId: string;
}

export function serializeOperator(operator: Operator): object {
    return {
        name: operator.name,
        operatorId: operator.operatorId
    }
}

export function parseOperator(json: any): Operator {
    return {
        name: json['name'],
        socket: null,
        game: null,
        operatorId: json['operatorId'],
    }
}

export function newOperator(socket: Socket, name: string, uuid: string): Operator {
    return {
        name,
        socket,
        game: null,
        operatorId: uuid
    }
}

export function setGame(operator: Operator, game: Game): Operator {
    setSessionGame(game);
    operator.game = game;
    return operator;
}

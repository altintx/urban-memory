import { Socket } from "socket.io";

export function loadMapMessage(socket: Socket, { map }: { map: string }) {
    const mapJson = require('../../../../resources/map/' + map + '.json');
    socket.emit("load_map", mapJson)
}
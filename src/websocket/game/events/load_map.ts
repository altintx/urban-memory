import { Socket } from "socket.io";
import { readFileSync } from "fs";

export function loadMapMessage(socket: Socket, { map }: { map: string }) {
    const mapJson = JSON.parse(readFileSync(`./maps/${map}.json`, "utf8"));
    socket.emit("load_map", mapJson);
}
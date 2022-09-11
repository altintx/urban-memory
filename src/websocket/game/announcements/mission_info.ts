import { serializeCharacter } from "../../../models/characters/character";
import { Operator } from "../../../models/characters/operator";
import { Mission } from "../../../models/missions/mission";
import { serializeMission } from "../../../models/missions/mission";
import { serializeTurn } from "../../../models/missions/turn";
import { loadCharacter } from "../../../sessions";
import { last } from "../../../utility/array";

export default async function missionInfoAnnouncement(mission: Mission, operator: Operator) {
    const characters = (await Promise.all(operator.game.workingSquad.map(uuid => loadCharacter(uuid)))).concat(mission.enemies)
    console.log('missionInfoAnnouncement');
    operator.socket.emit("mission_info", serializeMission(mission));
    operator.socket.emit("characters_info", characters.map(c => serializeCharacter(c)));
    const turn = last(mission.turns);
    if(turn)
        operator.socket.emit("turn_state", serializeTurn(turn));
}

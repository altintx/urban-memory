import { Operator } from "../../../models/characters/operator";
import { Mission } from "../../../models/missions/mission";
import { serializeMission } from "../../../models/missions/mission";

export default function missionInfoAnnouncement(mission: Mission, operator: Operator) {
    operator.socket.emit("mission_info", serializeMission(mission));
}

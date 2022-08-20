import { Mission, parseMission } from "./missions/mission";

type Campaign = {
    missions: Mission[],
}
const parseCampaign = (json: object): Campaign => {
    const campaign: Campaign = {
        missions: json['missions'].map(json => {
            const mission = require(`../../resources/mission/${json.mission}`);
            return parseMission(mission);
        })
    }
    return campaign;
}

const isMission = (uuid: String, campaign: Campaign): boolean => {
    return campaign.missions.some(m => m.uuid === uuid);
}

export {
    Campaign,
    parseCampaign,
    isMission
}

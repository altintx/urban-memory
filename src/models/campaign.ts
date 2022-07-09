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

export {
    Campaign,
    parseCampaign
}

import { Mission, parseMission } from "./missions/mission";

type Campaign = {
    missions: Mission[],
}
const parseCampaign = (json: object): Campaign => {
    const campaign: Campaign = {
        missions: json['missions'].map(json => parseMission(json.missions))
    }
    return campaign;
}

export {
    Campaign,
    parseCampaign
}

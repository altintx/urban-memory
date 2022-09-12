import { Mission, parseMission } from "./missions/mission";

type Campaign = {
    missions: Mission[],
    uuid: string,
}
const parseCampaign = async (json: object): Promise<Campaign> => {
    const campaign: Campaign = {
        missions: await Promise.all(json['missions'].map(json => {
            const mission = require(`../../resources/mission/${json.mission}`);
            return parseMission(mission);
        })),
        uuid: json['uuid'],
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

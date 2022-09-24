import { readFileSync, opendirSync, readdirSync  } from "fs";
import { Translatable } from "../utility/strings";
import { Mission, parseMission } from "./missions/mission";

export type Campaign = {
    missions: Mission[],
    uuid: string,
    name: Translatable;
    description: Translatable;
    alias: string;
}
export async function getCampaigns(): Promise<Campaign[]> {
    return (await Promise.all(readdirSync('resources/campaigns').map((alias): Promise<Campaign> => {
        const f = require(`../../resources/campaigns/${alias}/campaign.json`);
        return parseCampaign(f);
    }))).sort((a, b) => a.alias === 'story'? -1: b.alias === 'story'? 1: 0)
}
export async function parseCampaign (json: object): Promise<Campaign> {
    const alias = json['alias'];
    const campaign: Campaign = {
        missions: await Promise.all(json['missions'].map(json => {
            const mission = require(`../../resources/campaigns/${alias}/missions/${json.mission}`);
            return parseMission(mission);
        })),
        name: new Translatable(json['name']),
        description: new Translatable(json['description']),
        uuid: json['uuid'],
        alias
    }
    return campaign;
}

export function serializeCampaign(c: Campaign): object {
    return {
        campaignId: c.uuid,
        name: c.name.translations,
        description: c.description.translations
    };
}

export function isMission (uuid: String, campaign: Campaign): boolean {
    return campaign.missions.some(m => m.uuid === uuid);
}

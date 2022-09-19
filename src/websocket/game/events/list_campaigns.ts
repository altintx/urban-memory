import { Socket } from "socket.io";
import { getCampaigns, serializeCampaign } from "../../../models/campaign";

export async function listCampaignsMessage(socket: Socket) {
    socket.emit("list_campaigns", (await getCampaigns()).map(g => serializeCampaign(g)));
}
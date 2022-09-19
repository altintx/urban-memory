import { Socket } from "socket.io";
import { join, newGame, transferOperatorOrEnd, Visibility } from "../../../models/game";
import { setGame as setOperatorGame } from "../../../models/characters/operator";
import { getOperator, setGame } from "../../../sessions";
import joinedGameAnnouncement from "../announcements/joined_game";
import notLoggedInAnnouncement from "../announcements/not_logged_in";
import gameStateAnnouncement from "../announcements/game_state";
import { getCampaigns } from "../../../models/campaign";

export async function newGameMessage(socket: Socket, { publicGame, campaignId }: { publicGame: boolean, campaignId: string}): Promise<boolean> {
    const campaign = (await getCampaigns()).find(c => c.uuid === campaignId);
    if(!campaign) {
        return;
    }
    const operator = await getOperator(socket);
    if(!operator) return notLoggedInAnnouncement(socket);
    if(operator.game) {
        transferOperatorOrEnd(operator.game, operator);
    }
    let game = await newGame(operator, campaign);
    game.visibility = publicGame? Visibility.Public: Visibility.Private;
    await setGame(game)
    game = await join(game, operator);
    setOperatorGame(operator, game);
    joinedGameAnnouncement(game, operator);
    gameStateAnnouncement(game, operator);
    return true;
}
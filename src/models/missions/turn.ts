import { Action } from "../action";
import { CharacterId } from "../characters/character";

export type Turn = {
    members: CharacterId[],
    actions: Record<string, Action>[],
    member: number;
}

export function serializeTurn(turn: Turn): object {
    return {
        members: turn.members,
        actions: turn.actions.map(action => action.uuid),
        member: turn.member,
    }
}

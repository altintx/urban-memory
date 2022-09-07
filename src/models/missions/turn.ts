import { Action } from "../action";
import { Character } from "../characters/character";

export type Turn = {
    members: Character[],
    actions: Record<string, Action>[],
    member: number;
}

export function serializeTurn(turn: Turn): object {
    return {
        members: turn.members.map(member => member.uuid),
        actions: turn.actions.map(action => action.uuid),
        member: turn.member,
    }
}

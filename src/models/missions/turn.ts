import { Action } from "../action";
import { Character } from "../characters/character";

export type Turn = {
    members: Character[],
    actions: Record<string, Action>[],
}

export function serializeTurn(turn: Turn): object {
    return {
        members: turn.members.map(member => member.uuid),
        actions: turn.actions.map(action => action.uuid)
    }
}

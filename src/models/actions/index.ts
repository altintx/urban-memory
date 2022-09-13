import { ATTACK_PRIMARY, ATTACK_SECONDARY } from "./attack";
import { DASH, MOVE } from "./move";
import { SELECT_ATTENTION } from "./select";

const ACTIONS = [
    ATTACK_PRIMARY,
    ATTACK_SECONDARY,
    MOVE,
    DASH,
    SELECT_ATTENTION,
];
export default ACTIONS;
export enum NAMED_ACTIONS {
    ATTACK_PRIMARY,
    ATTACK_SECONDARY,
    MOVE,
    DASH,
    SELECT_ATTENTION,
}
export function actionForId(id: string) {
    return ACTIONS.find(a => a.uuid === id);
}

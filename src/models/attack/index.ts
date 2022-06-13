import { Character } from '@app/models/characters/character';
import { Game } from '@app/models/game';
import { Weapon } from '@app/models/characters/weapon';

enum AttackType { Targetted, AOE }; 
type Coordinates = {
    x: number;
    y: number;
    elevation: number;
}
type DamageInfliction = {
    target: Character;
    baseDamage: number;
    critical: boolean;
}
type Attack = {
    type: AttackType;
    attacker: Character;
    target: Character | Coordinates;
    flankers: Character[];
    oppressors: Character[];
    weapon: Weapon;
    attackRoll: number;
}

function compute(attack: Attack, game: Game): DamageInfliction[] {
    if(attack.oppressors.length) {
        // debuff
    }
    if(attack.flankers.length) {
        // buff
    }
    // determine distance from attacker to target
    // buff damage on weapon based on distance
    // cover buffs
    // other buffs?

    const role = Math.floor(Math.random() * 20);
    return [];
}

export { compute, AttackType, Attack };

import { Character, hasTrait, isPlayer } from '@app/models/characters/character';
import { Game } from '@app/models/game';
import { Weapon } from '@app/models/characters/weapon';
import { lucky, LuckyTrait } from '../characters/traits/lucky';
import { Obstacle } from '../obstacle/obstacle';
import { flatten } from 'array-flatten';
import { difficultyBuff } from '../core/difficulty';

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

const roll = sides => 1 + Math.floor(Math.random() * sides);

function compute(attack: Attack, game: Game): DamageInfliction[] {
    if(attack.type === AttackType.Targetted) return computeTarget(attack, game);
    computeAOE(attack, game);
}
const obstaclesBetween = (point1: Character, point2: Character): Obstacle[] => {
    return [];
}
function coverBonus(attack: Attack): number {
    const points = [attack.attacker].concat(attack.flankers);
    const obstacles = points.map(point => obstaclesBetween(<Character>attack.target, point));
    if(obstacles.some(o => o.length === 0)) return 0;
    return Math.max.apply(Math, flatten(obstacles).map(o => o.coverBonus));
}
function computeTarget(attack: Attack, game: Game): DamageInfliction[] {
    // accuracy should filter in here
    // distance
    // weapon type

    const attackerUnderFire = attack.oppressors.length > 0;
    const target = <Character>attack.target;
    const targetFlanked = attack.flankers.length > 0;

    const attackerRoll = roll(20) + lucky(attack.attacker) - (attackerUnderFire? 1: 0) + (isPlayer(attack.attacker)? difficultyBuff(game): 0);
    const defenderRoll = roll(20) + lucky(target) - (targetFlanked? 1: 0) + coverBonus(attack) + (isPlayer(target)? difficultyBuff(game): 0);
    const criticalAttack = hasTrait(attack.attacker, LuckyTrait)? [18, 19, 20]: [19, 20];
    let damage = attackerRoll - defenderRoll;
    if(damage < 0) return [];
    const isCritical = criticalAttack.includes(attackerRoll);
    
    damage -= Math.min(attack.oppressors.length, 5);
    if (damage < 0) return [];

    return [{
        baseDamage: damage,
        critical: isCritical,
        target: target
    }];
}

function computeAOE(attack: Attack, game: Game): DamageInfliction[] {
   // determine aoe center
   // determine attack radius
   // find characters in that radius
   // issue a targettedAtack on eacg for a fraction of weapon's damage diminishing on distance from epicenter
   return [];
}

export { compute, AttackType, Attack };

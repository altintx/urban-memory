import { Character, CharacterType, hasTrait, isPlayer } from '../characters/character';
import { Game } from '../game';
import { Weapon } from '../characters/weapon';
import { lucky, LuckyTrait } from '../characters/traits/lucky';
import { Obstacle } from '../obstacle/obstacle';
import { flatten } from 'array-flatten';
import { difficultyBuff } from '../difficulty';
import { at, coordsForIndex, getRing, Map } from '../map/map';
import { Cover, Tile } from '../map/tile';
import { isA } from '../../utility/types';

enum AttackType { Targetted, AOE }; 
type Coordinates = {
    x: number;
    y: number;
    elevation: number;
}
type DamageInfliction = {
    target: Character | Obstacle;
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
    attackRoll?: number;
    defenseRoll?: number;
}

const roll = sides => 1 + Math.floor(Math.random() * sides);

function compute(attack: Attack, game: Game): DamageInfliction[] {
    if(attack.type === AttackType.Targetted) return computeTarget(attack, game);
    return computeAOE(attack, game);
}
const obstaclesBetween = (point1: Character, point2: Character, map: Map): Obstacle[] => {
    const endpoints = map
        .grid
        .map((v, i) => 
            [point1, point2].includes(<Character>v.occupant)? -1: i
        ).filter(v => v > -1)
        .map(i => coordsForIndex(map.width, map.height, i));
    if(endpoints.length === 0) return [];
    const x1 = endpoints[0][0],
        y1 = endpoints[0][1],
        x2 = endpoints[1][0],
        y2 = endpoints[1][1];
    const slope = (y2 - y1) / (x2 - x1);
    const b = y1 - slope * x1;
    const obstacles = [];
    for (let x = x1; x <= x2; x++) {
        const y = Math.round(slope * x + b);
        const tile = at(map, x, y);
        if(tile.cover !== Cover.None) obstacles.push(<Obstacle>tile.occupant);
    }
    return obstacles;
}

function coverBonus(attack: Attack, map: Map): number {
    const points = [attack.attacker].concat(attack.flankers);
    const obstacles = points.map(point => obstaclesBetween(<Character>attack.target, point, map));
    if(obstacles.some(o => o.length === 0)) return 0;
    return Math.max.apply(Math, flatten(obstacles).filter(o => o).map(o => o.coverBonus));
}
function computeTarget(attack: Attack, game: Game): DamageInfliction[] {
    // accuracy should filter in here
    // distance
    // weapon type

    const attackerUnderFire = attack.oppressors.length > 0;
    const target = <Character>attack.target;
    const targetFlanked = attack.flankers.length > 0;

    const attackerRoll = attack.attackRoll || (roll(20) + lucky(attack.attacker) - (attackerUnderFire? 1: 0) + (isPlayer(attack.attacker)? difficultyBuff(game): 0));
    const defenderRoll = attack.defenseRoll || (roll(20) + lucky(target) - (targetFlanked? 1: 0) + coverBonus(attack, game.activeMission.map) + (isPlayer(target)? difficultyBuff(game): 0));
    const criticalAttack = hasTrait(attack.attacker, LuckyTrait)? [18, 19, 20]: [19, 20];
    let damage = attackerRoll - defenderRoll;
    if(damage <= 0) return [];
    const isCritical = criticalAttack.includes(attackerRoll);
    
    damage -= Math.min(attack.oppressors.length, 5);
    if (damage <= 0) return [];

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
   // issue a targettedAtack on each for a fraction of weapon's damage diminishing on distance from epicenter
   // todo: how to omit "covered" tiles
   const withDistance = (distance, o) => ({ distance, ...o });
   const coordinates = <Coordinates>attack.target;
   const map = game.activeMission.map;
   const epicenter = at(map, coordinates.x, coordinates.y);
   const spread = attack.weapon.spread;
   let blastZone = [epicenter];
   for (let index = 1; index < spread; index++) {
       blastZone = blastZone.concat(getRing(map, coordinates.x, coordinates.y, index).map(t => withDistance(index, t)))
   }
   return blastZone
        .filter((tile: Tile) => {
            const isCharacter = isA(tile.occupant, CharacterType);
            const isObstacle =  (tile.occupant && (<Obstacle>tile.occupant).destructable)
            return isCharacter || isObstacle;
        })
        .map((tile: Tile): DamageInfliction => {
            const diminished = (1 + spread - tile['distance']) / (spread + 1);
            const damage = attack.weapon.damage;
            return {
                baseDamage: Math.ceil(damage * diminished),
                critical: false,
                target: tile.occupant
            }
        })
}

export { compute, AttackType, Attack, DamageInfliction };

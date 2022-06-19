import { Translatable } from "../../utility/strings"

enum WeaponType { Melee, Pistol, Rifle, Shotgun, Sniper, Grenade }
type Weapon = {
    name: Translatable;
    type: WeaponType,
    spread: number,
    damage: number,
    optimalDistance: number,
}

export { Weapon, WeaponType }
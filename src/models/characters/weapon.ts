import { Translatable } from "@app/utility/strings"

enum Class { Melee, Pistol, Rifle, Shotgun, Sniper, Grenade }
type Weapon = {
    name: Translatable;
    type: Class,
    
}

export { Weapon }
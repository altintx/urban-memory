import { Character } from "../characters/character";
import { Obstacle } from "../obstacle/obstacle";

type Tile = {
    elevation: number;
    occupant?: Character | Obstacle;
    destructive: boolean;
    destructable: boolean;
    visible: boolean;
    
}

export {
    Tile
};

import { Translatable } from "../../utility/strings"

export type Gear = {
    name: Translatable;
    description: Translatable;
    type: "weapon",
    "subtype": "primary" | "secondary",
    "stats": {
        "damage": number,
        "range": number,
        "accuracy": number,
        "critical": number,
        "weight": number
    },
    uuid: string
}

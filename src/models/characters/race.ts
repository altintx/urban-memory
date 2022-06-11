type Race = {
    name: string;
}
const registry: { [key: string]: Race } = {}
function parseRace(json: object): Race {
    const name = json['name'];
    if(!registry[name]) {
        registry[name] = {
            name: name
        }
    } 
    return registry[name];
}

export {
    Race,
    parseRace
};

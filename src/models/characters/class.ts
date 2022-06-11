type Class = {
    name: string;
}
const registry: { [key: string]: Class } = {}
function parseClass(json: object): Class {
    const name = json['name'];
    if(!registry[name]) {
        registry[name] = {
            name: name
        }
    } 
    return registry[name];
}
export {
    Class,
    parseClass
};

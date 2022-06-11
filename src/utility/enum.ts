/** @description
 * given an integer or string value, grab the corresponding value from
 * a supplied enum. If the value isn't present, and a default is given
 * return that. If none of the above, return a random value from the
 * given enum.
 */
const enumValue = (desired: any, type: any, defaultValue = undefined) => {
    const possibilities = Object.values(type);
    if(possibilities.includes(desired)) return desired;
    const stringPossibilities = Object.keys(type).filter((v) => isNaN(Number(v)));
    if(stringPossibilities.includes(desired)) return type[desired];
    if(defaultValue !== undefined) return defaultValue;
    return possibilities[Math.floor(Math.random() * possibilities.length)];
}

export {
    enumValue
};

export function isA(variable: object, type: object): Boolean {
    if(typeof variable !== "object") return false;
    const k1 = Object.keys(variable), k2 = Object.keys(type);
    return k1.every(k => k2.includes(k)) && k2.every(k => k1.includes(k));
    
}
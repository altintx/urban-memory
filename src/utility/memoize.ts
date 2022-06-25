const OPTIMIZE = false;
export function memoize(callback: Function): Function {
    if(!OPTIMIZE) return callback;
    const params = callback.length;
    const _memo = {};
    return function() {
        const args = [];
        for (let i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        if(args.length != params) {
            throw new Error(`Unexpected number of parameters to ${callback.name}`);
        }
        const key = args.join('///');
        if(!(key in _memo)) {
            _memo[key] = callback.apply(null, args);
        }
        return _memo[key];
    }
}

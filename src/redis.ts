import { createClient } from 'redis';

let onReady;
let ready = new Promise((_done) => onReady = _done);
const client = (() => {
    const client = createClient({ url: process.env["REDIS_URL"] });
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.connect().then(onReady);
    return client;
})();

export { 
    client,
    ready
};

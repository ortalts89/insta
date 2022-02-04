const redis = require('redis');
const { promisify } = require('util');


function createRedisClient() {
    const client = redis.createClient({
        socket: {
            host: process.env.REDIS_HOSTNAME,
            port: Number(process.env.REDIS_PORT),
          },
          password: process.env.REDIS_PASSWORD
    });
    client.connect();
    client.on('connect', function() {
        console.log('Connected to redis!');
        //client.keys('*').then((keys) => console.log("all keys: ", keys));
      });
      return client;
}

const client = createRedisClient();

module.exports = {
    client
}




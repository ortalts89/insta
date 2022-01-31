const redis = require('redis');

function createRedisClient() {
    const client = redis.createClient({
        socket: {
            host: 'redis-15152.c245.us-east-1-3.ec2.cloud.redislabs.com',
            port: 15152,
          },
          password: 'HfietpUPXPmIImO3dfYBhq1Jc12AKzoZ'
    });
    client.connect();
    client.on('connect', function() {
        console.log('Connected to redis!');
      });
      return client;
}

const client = createRedisClient();

module.exports = {
    client
}


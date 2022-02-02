const { client } = require('../redis');



async function getToken(token) {
    const payload =  await client.get(token);
    console.log("payload: ", payload)
    if(payload) {
        return JSON.parse(payload);
    }
    return null;
}

async function setToken(token, payload) {
    await client.set(token, JSON.stringify(payload));
    await client.expire(token, 60);
}

module.exports = {
    getToken,
    setToken
}
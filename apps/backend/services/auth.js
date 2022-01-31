const jwt = require('jsonwebtoken');
const {findAndUpdateUser} = require('./users');

async function setUserToken(user, oldIdentifier) {
    const payload = {
        user: {id: user.id},
        created: (new Date()).toJSON(),
        identifier: Math.random().toString()
    }
    
    const query = {_id: user.id};
    if(oldIdentifier){
        query['authenticationMethods.identifier'] = oldIdentifier;
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const result = await findAndUpdateUser(query, {authenticationMethods: {created: payload.created, identifier: payload.identifier}});
    return result ? token : null;
}

module.exports = {setUserToken};
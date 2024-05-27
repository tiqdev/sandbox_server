const jwt = require('jsonwebtoken');

const generateToken = (userId) => {

    //userId for payload
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '5m' //5 minutes
    })
    return token;
}

module.exports = generateToken;
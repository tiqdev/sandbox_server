const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    //we get that res from response for cookie

    //userId for payload
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', //for https
        sameSite: 'strict', //for csrf attack
        maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
    })

    return token;
}

module.exports = generateToken;
const jwt = require('jsonwebtoken');
const config = require('../config/auth').jwt;

const authenticateToken = (req, res, next) => {
    console.log('isAuth pradzia');
    const accessToken = req.cookies.token;
    if(!accessToken) {
        return res.send(401).send({ message: 'Token not provided!' })
    }
    
    try {
        const payload = jwt.verify(accessToken, config.secret);
        if (payload.type !== config.tokens.access.type) {
            return res.send(401).send({ message: 'Invalid token!' });        
        }
        res.userId = payload.userId
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired!' });
        }
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token!' });
        }
    }
    next(); 
}
module.exports = authenticateToken

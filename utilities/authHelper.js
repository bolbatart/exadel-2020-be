// unique id generator
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const { secret, tokens } = require('../config/auth').jwt;
const mongoose = require('mongoose');

const tokenModel = mongoose.model('tokens');


const generateAccessToken = (userId) => {
    const payload = {
        userId: String(userId),
        type: tokens.access.type,
    }
    const options = { expiresIn: tokens.access.expiresIn };
 
    return jwt.sign(payload, secret, options);
};


const generateRefreshToken = () => {
    const payload = {
        id: uuid(),
        type: tokens.refresh.type,
    };
    const options = { expiresIn: tokens.refresh.expiresIn };

    return {
        id: payload.id,
        token: jwt.sign(payload, secret, options),
    };
};


const saveToDbRefreshToken = (tokenId, userId) => {
    tokenModel.findOne({ userId }, async (err, data) => {
        if(!err){
            if(data){
                data.tokenId = tokenId
                await data.save()
                return { message: 'refresh token was updated!'};
            } else {
                tokenModel.create({ tokenId, userId })
                return { message: 'refresh token was created!'};
            }
        } else {
            return err;
        }
    })
};

// FUNCTION FOR contorllers/user/login.js AND contorllers/user/refreshTokens.js
const createTokens = (userId) => {
    const accessToken =  generateAccessToken(userId)
    const refreshToken =  generateRefreshToken()
  
    saveToDbRefreshToken(refreshToken.id, userId)
  
    return { accessToken, refreshToken: refreshToken.token };
};

// FUNCTION FOR contorllers/user/logout.js
const getRefreshTokenId = (req, res) => {
    const refreshToken = req.cookies['refresh-token'];
    let payload;
    try {
      payload = jwt.verify(refreshToken, authConfig.secret);
      if (payload.type !== 'refresh') {
        res.status(400).json({ message: 'Invalid token!' });
        return false;
      }
      return payload.id;
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        res.status(400).json({ message: 'Token expired!' });
        return false;
      } else if (e instanceof jwt.JsonWebTokenError) {
        res.status(400).json({ message: 'Invalid token!' });
        return false;
      }
    }
};



module.exports = {
    generateAccessToken,
    generateRefreshToken,
    saveToDbRefreshToken,
    getRefreshTokenId,
    createTokens,
}
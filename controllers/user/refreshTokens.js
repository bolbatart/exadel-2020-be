const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const tokenModel = mongoose.model('tokens');
const authConfig = require('../../config/auth').jwt;
const authHelper = require('../../utilities/authHelper');

const RefreshTokens = async (req, res) => {
  const refreshToken = req.cookies['refresh-token'];
  let payload;

  try {
    payload = jwt.verify(refreshToken, authConfig.secret);
    if (payload.type !== 'refresh') {
      return res.status(400).json({ message: 'Invalid token!' });
    }
    const refreshTokenId = payload.id
    if (refreshTokenId !== false) {
      tokenModel.findOne({ tokenId: refreshTokenId }, (err, data) => {
        if (data === null) {
          res.status(400).send({ message: 'Token does not exists!' })
        } else {
          const tokens = authHelper.createTokens(data.userId);

          res.cookie('refresh-token', tokens.refreshToken, { maxAge: 1000 * 60 * 30, httpOnly: true });
          res.cookie('token', tokens.accessToken, { maxAge: 1000 * 60 * 15, httpOnly: true });
          return res.status(200).send({ message: 'Tokens updated...' })
        }
      })
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ message: 'Token expired!' });
    } else if (e instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token!' });
    }
  }

}

module.exports = RefreshTokens

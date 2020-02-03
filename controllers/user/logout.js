const authHelper = require('../../utilities/authHelper');
const mongoose = require('mongoose')
const tokenModel = mongoose.model('tokens');


const Logout = async (req, res) => {
    const refreshTokenId = await authHelper.getRefreshTokenId(req, res)
    
    if (refreshTokenId !== false) {
      try {
        await tokenModel.findOneAndRemove({ tokenId: refreshTokenId })  
        res.clearCookie('token');
        res.clearCookie('refresh-token');
        return res.status(200).send({ message: 'You have successfully logged out...' });
      } catch (e) {
        return res.status(500).send({ message: 'Something went wrong ', error: e });
      }
    }
}

module.exports = Logout
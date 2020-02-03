const mongoose = require('mongoose');
const userModel = mongoose.model('users');
const authHelper = require('../../utilities/authHelper');
const hashPass = require('../../utilities/passwordHash');
const saltHashPassword = hashPass.saltHashPassword;


const Login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = saltHashPassword(req.body.password);

    await userModel.findOne({ email, password })
      .then(async (user) => {
        if (user) {
          const tokens = authHelper.createTokens(user._id)
          res.cookie('token', tokens.accessToken, { maxAge: 1000 * 60 * 15, httpOnly: true });
          res.cookie('refresh-token', tokens.refreshToken, { maxAge: 1000 * 60 * 30, httpOnly: true });
          return res.status(200).json({
            message: "Logged in...",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
          });
        } else {
          return res.status(400).send({ message: "Wrong email or password" })
        }
      });
  } catch (e) {
    return res.status(500).send(e);
  }
}


module.exports = Login;


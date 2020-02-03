const mongoose = require('mongoose');
const userModel = mongoose.model('users');
const user = new userModel();

const hashPass = require('../../utilities/passwordHash');
const saltHashPassword = hashPass.saltHashPassword;

const addNewUser = async (req, res) => {
  try {
    (user.firstname = req.body.firstname),
      (user.lastname = req.body.lastname),
      (user.email = req.body.email),
      (user.password = saltHashPassword(req.body.password)),
      (user.phonenumber = req.body.phonenumber),
      (user.country = req.body.country),
      (user.image = req.body.image),
      (user.description = req.body.description);

    await user.save(req.body);
    return res.status(200).send({ message: "User added successfully " });
  } catch (e) {
    return res.status(500).send({ message: 'Something went wrong...' });
  }
};

module.exports = addNewUser;

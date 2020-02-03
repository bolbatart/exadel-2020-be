const mongoose = require('mongoose');
const userModel = mongoose.model('users');

/**
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */

 const deleteUserController = async (req, res, next) => {
     
  userModel.findByIdAndRemove({ _id: req.params.id }).then(deletedUser => {
        try {
          // return person object, what was deleted
          res
            .status(201)
            .send({ message: deletedUser.firstname + " was deleted successfully " });
        } catch (err) {
          res.status(400).send({ message: "Delete error " });
        }
      });
 }

 module.exports = deleteUserController;
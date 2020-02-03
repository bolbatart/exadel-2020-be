const mongoose = require('mongoose');
const projectModel = mongoose.model('projects');

/**
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */

 const deleteProjectController = async (req, res, next) => {
    projectModel.findByIdAndRemove({ _id: req.params.id }).then(deletedProject => {
        try {
          // return person object, what was deleted
          res
            .status(201)
            .send({ message: deletedProject.projectName + " was deleted successfully " });
        } catch (err) {
          res.status(400).send({ message: "Delete error " });
        }
      });
 }

 module.exports = deleteProjectController;
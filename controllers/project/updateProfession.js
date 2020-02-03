const mongoose = require('mongoose');
const projectModel = mongoose.model('projects');

/**
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */

const updateProfessionController = (req, res, next) => {
    projectModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(400).send({ message: "Update was not successfull" });
        } else {
          res.status(201).send({
            message: req.body.projectName + " project updated successfully",
            project: req.body
          });
        }
      }
    );
  }

  module.exports = updateProfessionController
const mongoose = require('mongoose');
const projectModel = mongoose.model('projects');

/**
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */

//  when user is loged in and wants to see his projects
 const getUserProjectsController = async (req, res, next) => {
    // find by user id
    projectModel.find({ userId: req.params.user }, (err, docs) => {
        if (err) {
          res.status(401).send({
            message: "Data collecting went wrong "
          });
        } else {
          res.status(200).send({
            message: "Collected users projects from database",
            userProjects: docs
          });
        }
      });
 }
 /**
  * task in creating project do not forget
  * Need make route, when press on project as not registered user
  * 
  * every project will have projectId after click will run action
  * 
  * 
  * 1 When making project, save project id into user and project collections
  * 2 in front-end forEach users array with projects id
  *     * every cycle will send projects id to find it into projects controller
  *     * after res will be set to state and foreached in front
  */

 module.exports = getUserProjectsController;
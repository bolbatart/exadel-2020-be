const mongoose = require('mongoose');
const projectModel = mongoose.model('projects');
const project = new projectModel();
const userModel = mongoose.model('users');
const user = new userModel();
// when making new project add project id in user projects[]
/**
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const addProjectController = async (req, res) => {

// services - validation, authentification
  try {
    project.projectName = req.body.projectName,
    project.photo = req.body.photo,
    project.projectLocation = req.body.projectLocation,
    project.professionalsNeeded = req.body.professionalsNeeded,
    project.projectArea = req.body.projectArea,
    project.projectShortDescription = req.body.projectShortDescription,
    project.projectDescription = req.body.projectDescription,
    // project.lastUpdate = req.body.lastUpdate,
    // project.timeInserted = req.body.timeInserted,
    project.userId = req.body.userId,
    await project.save(req.body);

    return res
    .status(201)
    .send({ message: " Project added successfully " });
  } catch (e) {
    return e;
  }
};

module.exports = addProjectController;
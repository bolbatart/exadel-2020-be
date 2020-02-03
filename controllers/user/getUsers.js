const mongoose = require('mongoose');
const userModel = mongoose.model('users');
const projectModel = mongoose.model('projects');


const getUsersController = async (req, res) => {
  const user = await userModel.findById(res.userId);
  
  
  const projects = []
  // if(user.projects !== undefined){
  //   user.projects.forEach(pr => {
  //     let project = projectModel.findById(pr._id)
  //     let toPush = {
  //       _id: project._id,
  //       name: project.name,
  //       location: project.location,
  //       professionalsNeeded: project.professionalsNeeded,
  //       area: project.area,
  //       shortDescription: project.shortDescription
  //       // image
  //     }
  //     projects.push(toPush)
  //   });
  // }

  const toSend = {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    links: user.links,
    phonenumber: user.phonenumber,
    location: user.location,
    projects
    // photo
  }
  console.log(toSend)
  return res.send(toSend);
};

module.exports = getUsersController;
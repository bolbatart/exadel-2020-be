const express = require("express");
const app = express();

/**
 * main tasks*
 * 1 save project id into users controller
 *  *after successfull login send user id
 *  *when creating project take id to know, what user made project and save project id into user projects array
 * 
 * 2 after click to project as not registered user takes project id
 *  *finds user in controller user.projects.find({ _id: ""})
 * to print user who made that project
 * 
 * to find project projects.find()
 */
const addProjectController = require('../../controllers/project/addProject');
const getProjectController = require('../../controllers/project/getProject');
const getProjectsController = require('../../controllers/project/getProjects');
const getUserProjectsController = require('../../controllers/project/getUserProjects');
const deleteProjectController = require('../../controllers/project/deleteProject');
const updateProjectController = require('../../controllers/project/updateProject');
const updateProfessionController = require('../../controllers/project/updateProfession')
const { validateNewProject } = require('../../middlewares/validation');
const isAuth = require('../../middlewares/isAuth');

// Project routes
const addProject = (app) => {
    app.post('/add-project', [validateNewProject, isAuth], (req, res) => {
      return addProjectController(req, res);
    });
  }
  
  const getProject = (app) => {
    app.get('/project/:project_id', (req, res) => {
      return getProjectController(req, res);
    });
  }

  function getProjects (app) {
    app.get('/projects/:per/:page', async (req, res) => {
      // console.log(req.params)
      return await getProjectsController(req, res);
    });
  }

  // 1 validate 2 auth 3 getUsersProject
  const getUserProjects = (app) => {
    app.get('/user-projects/:user', (req, res) => {
      return getUserProjectsController(req, res);
    });
  }
  
  const deleteProject = (app) => {
    app.delete('/delete-project/:id', [isAuth], (req, res) => {
      return deleteProjectController(req, res);
    });
  }

  const updateProfession = (app) => {
    app.put('/update-professions/:id/:profession', (req, res) => {
      return updateProfessionController
    });
  }

  const updateProject = (app) => {
    app.put('/update-project/:id', [isAuth, updateProjectController], (req, res) => {
    });
  }
  
  module.exports =  {
    addProject,
    getProject,
    getProjects,
    getUserProjects,
    deleteProject,
    updateProject,
    updateProfession
  }
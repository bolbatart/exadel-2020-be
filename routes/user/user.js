const express = require("express");
const app = express();

const addNewUserController = require('../../controllers/user/register');
const Login = require('../../controllers/user/login');
const getUsersController = require('../../controllers/user/getUsers');
const deleteUserController = require('../../controllers/user/deleteUser');
const RefreshTokens = require('../../controllers/user/refreshTokens');
const Logout = require('../../controllers/user/logout');

const validate = require('../../middlewares/validation');
const isAuth = require('../../middlewares/isAuth')

const register = (app) => {
  app.post('/register', [validate.registration], (req, res) => {
    return addNewUserController(req, res);
  });
}

const login = (app) => {
  app.post('/login', [validate.login], (req, res) => {
    return Login(req, res);
  });
}

const deleteUser = (app) => {
  app.delete('/delete-user/:id', (req, res) => {
    return deleteUserController(req, res);
  });
}

const getUsers = (app) => {
  app.get('/users', isAuth, (req, res) => {
    return getUsersController(req, res);
  });
}

const refreshTokens = (app) => {
  app.post('/refresh-tokens', (req, res) => {
    return RefreshTokens(req, res);
  })
}

const logout = (app) => {
  app.delete('/logout', isAuth, (req, res) => {
    return Logout(req, res);
  })
}

module.exports =  {
  register,
  login,
  getUsers,
  deleteUser,
  refreshTokens,
  logout,
}
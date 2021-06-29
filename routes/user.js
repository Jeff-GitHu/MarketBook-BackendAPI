const express = require('express');
const route = express.Router();

const {register, login, getUser} = require('../controllers/user');

route.get('/', getUser);
route.post('/register', register);
route.post('/login', login);

module.exports = route;
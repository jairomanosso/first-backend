const express = require('express')
const UsersController = require('../controllers/UsersController')

const usersController = new UsersController()

const usersRoutes = express()

usersRoutes.post('/', usersController.create)

module.exports = usersRoutes
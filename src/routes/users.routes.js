const express = require('express')
const UsersController = require('../controllers/UsersController')

const usersController = new UsersController()

const usersRoutes = express()

usersRoutes.post('/', usersController.create)
usersRoutes.delete('/', usersController.delete)
usersRoutes.get('/:id', usersController.show)
usersRoutes.get('/', usersController.index)
usersRoutes.put('/:id', usersController.update)

module.exports = usersRoutes
const express = require('express')
const usersRoute = require('./users.routes')

const routes = express()

routes.use('/users', usersRoute)

module.exports = routes
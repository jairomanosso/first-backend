const express = require('express')
const usersRoute = require('./users.routes')
const moviesRoute = require('./movies.routes')

const routes = express()

routes.use('/users', usersRoute)
routes.use('/movies', moviesRoute)

module.exports = routes
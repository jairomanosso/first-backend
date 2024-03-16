const express = require('express')
const usersRoute = require('./users.routes')
const moviesRoute = require('./movies.routes')
const tagsRoute = require('./tags.routes')

const routes = express()

routes.use('/users', usersRoute)
routes.use('/movies', moviesRoute)
routes.use('/tags', tagsRoute)

module.exports = routes
const express = require('express')
const MoveisController = require('../controllers/MoviesController')

const moviesController = new MoveisController()

const moviesRoutes = express()

moviesRoutes.post('/', moviesController.create)

module.exports = moviesRoutes
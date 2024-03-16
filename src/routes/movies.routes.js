const express = require('express')
const MoveisController = require('../controllers/MoviesController')

const moviesController = new MoveisController()

const moviesRoutes = express()

moviesRoutes.post('/', moviesController.create)
moviesRoutes.delete('/:id', moviesController.delete)
moviesRoutes.get('/:id', moviesController.show)
moviesRoutes.get('/', moviesController.index)
moviesRoutes.put('/:id', moviesController.update)

module.exports = moviesRoutes
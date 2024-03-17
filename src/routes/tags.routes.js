const express = require('express')
const TagsController = require('../controllers/TagsController')

const tagsController = new TagsController()

const tagsRoutes = express()

tagsRoutes.get('/', tagsController.index)
tagsRoutes.get('/:user_id', tagsController.show)

module.exports = tagsRoutes
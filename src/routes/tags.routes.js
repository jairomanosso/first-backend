const express = require('express')
const TagsController = require('../controllers/TagsController')

const tagsController = new TagsController()

const tagsRoutes = express()

tagsRoutes.get('/', tagsController.index)

module.exports = tagsRoutes
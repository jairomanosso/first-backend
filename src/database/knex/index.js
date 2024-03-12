const path = require('path')
const knex = require('knex')
const config = require('../../../knexfile')

const connection = knex(config.development)


module.exports = connection
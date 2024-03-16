const knex = require('../database/knex')

class TagsController{

    async index(request, response){
        const { id } = request.query

        const tags = await knex('tags')

        return response.json(tags)
    }
}

module.exports = TagsController
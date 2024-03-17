const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class TagsController{

    async index(request, response){
        const { id } = request.query

        const tags = await knex('tags')

        return response.json(tags)
    }

    async show(request, response){
        const { user_id } = request.params

        const [ user ] = await knex('users').where({ id: user_id })

        if(!user){
            throw new AppError('User not found', 404)
        }

        const tagsByUser = await knex('tags').where({user_id})

        return response.json(tagsByUser)
        
    }
}

module.exports = TagsController
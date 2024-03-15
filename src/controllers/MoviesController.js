const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class MoveisController {

    async create(request, response){
        const { title, description, score, user_id } = request.body

        const [checkMovieExists] = await knex('movies').where({ title })
        const [checkUserExists] = await knex('users').where({ id: user_id })

        if(checkMovieExists){
            throw new AppError('movie already registered')
        }

        if(score < 0 || score > 5){
            throw new AppError('score must be between 0 and 5')
        }

        if(!checkUserExists){
            throw new AppError('user not found!')
        }

        await knex('movies').insert({
            title,
            description,
            score,
            user_id
        })

        return response.json({
            message: `movie ${title} registered!`
        })
    }

}

module.exports = MoveisController
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class MoveisController {

    async create(request, response){
        const { title, description, score, user_id, tags } = request.body

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

        const [ movie_id ] = await knex('movies').insert({
            title,
            description,
            score,
            user_id
        })

        const movieTags = tags.map(name => {
            return {
                movie_id,
                user_id,
                name
            }
        })

        await knex('tags').insert(movieTags)

        return response.json({
            message: `movie ${title} registered!`
        })
    }

    async delete(request, response){
        const { id } = request.params

        await knex('movies').where({ id }).delete()

        return response.json({
            message: `movie id:${id} was deleted`
        })
    }

    async show(request, response){
        const { id } = request.params

        const movie = await knex('movies').where({ id })

        response.json(movie)
    }

}

module.exports = MoveisController
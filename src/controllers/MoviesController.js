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

        const [ movie ] = await knex('movies').where({ id })

        if(!movie){
            throw new AppError('movie not found', 404)
        }

        await knex('movies').where({ id }).delete()

        return response.json({
            message: `movie id:${id} was deleted`
        })
    }

    async show(request, response){
        const { id } = request.params

        const [ movie ] = await knex('movies').where({ id })
        
        if(!movie){
            throw new AppError('movie not found', 404)
        }
        
        
        response.json(movie)
    }

    async index(request, reponse){
        const movies = await knex('movies')

        const moviesList = movies.map(movie => {
            return {
                title: movie.title,
                description: movie.description,
                score: movie.score
            }
        })

        return reponse.json(moviesList)
    }

    async update(request, response){
        const { id } = request.params 
        const { title, description, score, tags, user_id } = request.body

        const [ movie ] = await knex('movies').where({ id })

        if(!movie){
            throw new AppError('movie not found', 404)
        }

        if(movie.user_id != user_id) {
            throw new AppError('unauthorized, invalid credentials', 401)
        }

        if(title){
            const [ titleMovieExists ] = await knex('movies').where({ title })

            if(titleMovieExists && titleMovieExists.id !== movie.id){
                throw new AppError('Title already registered')
            }

            await knex('movies').where({ id }).update({title})
        }

        if(description){
            await knex('movies').where({ id }).update({ description })
        }

        if(score){
            if(score < 0 || score> 5){
                throw new AppError('score out range, 0 to 5')
            }

            await knex('movies').where({ id }).update({ score })
        }

        return response.json({
            message: `movie data changed`
        })
    }

}

module.exports = MoveisController
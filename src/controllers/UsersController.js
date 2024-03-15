const knex = require('../database/knex')
const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')

class UsersController{

    async create(request, response){
        const { name, email, password } = request.body

        const [checkUserExists] = await knex('users').where({ email })

        if(checkUserExists) {
            throw new AppError(`user's email already registered`, 409)
        }

        const encryptedPassword = await hash(password, 8)

        await knex('users').insert({
            name, 
            email, 
            password: encryptedPassword
        })

        return response.json({
            message: 'User created!'
        })

    }

    async delete(request, response){
        const { id } = request.query

        const [user] = await knex('users').where({ id })

        if(!user){
            throw new AppError('User not found', 404)
        }
        
        await knex('users').where({ id }).delete()

        return response.json({message: `User Id ${id} deleted!`})
    }

    async show(request, response){
        const { id } = request.params

        const [ user ] = await knex('users').where({ id })

        if(!user){
           throw new AppError('User not found', 404)
        }

        return response.json({
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at
        })
    }

    async index(request, response){
        const users = await knex('users')
        const usersData = users.map(user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

        return response.json(usersData)
    }

    async update(request, reponse){
        const { name, email, password, old_password } = request.body
        const { id } = request.params

        const [ user ] = await knex('users').where({ id })
        
        if(!user){
            throw new AppError('user not found', 404)
        }

        //change email
        if(email){
            
            const [ userEmailToUpdate ] = await knex('users').where({ email })

            if(userEmailToUpdate && userEmailToUpdate.id !== user.id){
                throw new AppError('Email already registered', 409)
            } else {
                await knex('users').where({ id }).update({email: email})
    
                return reponse.json({
                    message: 'your email has been changed'
                })
            }
        }

        //change password
        if(password && !old_password){
            throw new AppError('please enter your old password', 422)
        }

        if(password && old_password){
            const comparePasswords = await compare(old_password, user.password)

            if(!comparePasswords){
                throw new AppError(`passwords don't match`, 409)
            }

            const encryptedPassword = await hash(password, 8)
            await knex('users').where({ id }).update({password: encryptedPassword})
            return reponse.json({
                message: 'password has been changed'
            })

        }

    }    
}


module.exports = UsersController
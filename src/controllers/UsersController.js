const knex = require('../database/knex')
const { hash } = require('bcryptjs')

class UsersController{

    //create a user
    async create(request, response){
        const { name, email, password } = request.body

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

    //delete a user by id from database
    async delete(request, response){
        const { id } = request.query

        await knex('users').where({ id }).delete()

        return response.json({message: `User Id ${id} deleted!`})
    }

    //return a user's data by id
    async show(request, response){
        const { id } = request.params

        const [ user ] = await knex('users').where({ id })


        //Trabalhar melhor esse erro, estudar o throw new error com express
        if(!user){
            return response.status(404).json({
                id:id, 
                message: "User not found!"
            })
        }

        return response.json({
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at
        })
    }

    //return all users at database
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

}

module.exports = UsersController
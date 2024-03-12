const knex = require('../database/knex')
const { hash } = require('bcryptjs')

class UsersController{

    async create(request, response){
        const { name, email, password } = request.body

        const encryptedPassword = await hash(password, 8)

        await knex('users').insert({
            name, 
            email, 
            password: encryptedPassword
        })

        response.json({
            message: 'User created!'
        })

    }
}

module.exports = UsersController
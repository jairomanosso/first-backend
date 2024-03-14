require('express-async-errors')
const express = require('express')
const routes = require('./routes')
const AppError = require('./utils/AppError')

const server = express()
const port = 3001

server.use(express.json())
server.use(routes)

server.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        message: "Internal error"
    })
})

server.listen( port, () => console.log(`Server is running on port ${port}`))
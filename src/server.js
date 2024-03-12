const express = require('express')
const routes = require('./routes')
const sqlConnection = require('./database')

const server = express()
const port = 3001

server.use(express.json())
server.use(routes)

sqlConnection()

server.listen( port, () => console.log(`Server is running on port ${port}`))
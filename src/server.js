const express = require('express')
const routes = require('./routes')

const server = express()
const port = 3000

server.use(express.json())
server.use(routes)

server.listen( port, () => console.log(`Server is running on port ${port}`))
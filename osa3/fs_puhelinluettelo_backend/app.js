require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const contactsRouter = require('./controllers/contacts')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use('/api/persons', contactsRouter)
app.use(middleware.requestLogger)

//     { name: 'Arto Hellas', number: '040-123456', id: 0 },
//     { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
//     { name: 'Dan Abramov', number: '12-43-234345', id: 2},
//     { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
// ]

//Mongoose
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
//
app.use(middleware.unknownEndpoint)


// Tämä kaikkien muiden middleware määrittelyjen jälkeen
app.use(middleware.errorHandler)

// eslint-disable-next-line no-undef
// const PORT = process.env.PORT
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

module.exports = app
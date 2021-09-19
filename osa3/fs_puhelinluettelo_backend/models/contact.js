/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
// eslint-disable-next-line no-undef
const url =process.env.MONGODB_URI

console.log('Connecting to URL: ', url)
mongoose
  .connect(url)
  .then(res => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  number: String
})
const Contact = mongoose.model('Contact', contactSchema)
contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

if(process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url =
    `mongodb+srv://fsuser:${password}@cluster0.jokzo.mongodb.net/fspersons?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)


if (process.argv[3] === undefined || process.argv[4] === undefined) {
  Contact.find({}).then(res => {
    res.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
} else {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4]
  })
    
  contact.save().then(res => {
    console.log('Added ', res.name, ' ', res.number, ' to phonebook')
    mongoose.connection.close()
  })
}



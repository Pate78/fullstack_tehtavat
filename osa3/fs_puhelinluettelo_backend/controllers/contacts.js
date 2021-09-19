const contactsRouter = require('express').Router()
const Contact = require('../models/contact')

let contacts = []

let currentdate = new Date()
let datetime = 'Last Sync: ' + currentdate.getDate() + '/'
                + (currentdate.getMonth()+1)  + '/'
                + currentdate.getFullYear() + ' @ '
                + currentdate.getHours() + ':'
                + currentdate.getMinutes() + ':'
                + currentdate.getSeconds()

contactsRouter.get('/', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
})

contactsRouter.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${contacts.length+1} people <br />
      ${datetime}`).end()
})

contactsRouter.get('/:id', (req, res, next) => {
  // res.json(contacts.find(c => c.id === req.body.id))
  //   const id = Number(req.params.id)
  //   const contact = contacts.find(c => c.id === id)
  Contact.findById(req.params.id)
    .then(c => {
      if(c) {
        res.json(c)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

contactsRouter.delete('/:id', (req,res,next) => {
  const id = Number(req.params.id)
  contacts.splice(id)
  Contact.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
})

contactsRouter.post('/', (req,res,next) => {
  const newContact = req.body
  const foundContact = contacts.find(c => c.name === newContact.name)
  console.log('Found contact: ',foundContact)
  // console.log(newContact)
  // eslint-disable-next-line no-irregular-whitespace
  if(newContact === undefined || newContact.number === undefined || newContact.name === undefined || foundContact !== undefined) {
    return res.status(400).json({ error: 'Name must be unique' })
  } else {
    const contact = new Contact({
      name: newContact.name,
      number: newContact.number
    })
    contact.save().then(savedContact => {
      contacts.push(savedContact)
      res.json(savedContact)
    })
      .catch(error => next(error))
  }
})

module.exports = contactsRouter
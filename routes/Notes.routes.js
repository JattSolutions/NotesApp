const router = require('express').Router()
let Notes = require('../models/Notes.model')

router.route('/').get((req, res) => {
  Notes.find()
    .then((notes) => {
      return res.json({ notes })
    })
    .catch((error) => res.isCompleted(400).json('Error ' + error))
})

router.route('/add').post((req, res) => {
  const { isCompleted, description } = req.body

  const newNotes = new Notes({ isCompleted, description })

  newNotes
    .save()
    .then((note) => {
      return res.json({ note })
    })
    .catch((error) => {
      console.log('error ', error)
      return res.json({ error })
    })
})

router.route('/update/:nid').patch((req, res) => {
  const { nid } = req.params
  const { isCompleted, description } = req.body
  Notes.findByIdAndUpdate(nid, { isCompleted, description }, { new: true })
    .then((note) => {
      return res.json({ note, message: 'Note updated successfully!' })
    })
    .catch((error) => {
      return res.json({ error })
    })
})

router.route('/remove/:nid').delete((req, res) => {
  const { nid } = req.params
  Notes.findByIdAndRemove(nid)
    .then((note) => {
      return res.json({ note, message: 'Note deleted successfully!' })
    })
    .catch((error) => {
      return res.json({ error })
    })
})

module.exports = router

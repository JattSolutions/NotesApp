const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
app.use(cors())

app.use(express.json())
const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
// app.use(express.static('client/build'))

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
// })

const uri =
  'mongodb+srv://zawar:9292732@cluster0.bt4cp.mongodb.net/NotesDB?retryWrites=true&w=majority'
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

const connection = mongoose.connection
connection.once('open', () => {
  console.log('Mongoose Connection established')
})

const notesRoutes = require('./routes/Notes.routes')
app.use('/notes', notesRoutes)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

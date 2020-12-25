const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notesSchema = new Schema(
  {
    isCompleted: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Notes = mongoose.model('Notes', notesSchema)
module.exports = Notes

const { Schema, model } = require('mongoose')
const LinkSchema = Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
    required: [true, 'link is required']
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: new Date()
  }
})

LinkSchema.methods.toJSON = function () {
  const { __v, ...link } = this.toObject()
  return link
}

module.exports = model('Link', LinkSchema)

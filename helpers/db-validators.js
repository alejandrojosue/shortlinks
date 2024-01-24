const Link = require('../models/link')
const User = require('../models/user')

const emailExist = async (email = '') => {
  const existEmail = await User.findOne({ email })
  if (existEmail) {
    throw new Error(`The email: ${email} already exists in the database`)
  }
}

const userIdExist = async (id) => {
  const idExist = await User.findById(id)
  if (!idExist) {
    throw new Error(`user id: ${id} not exists`)
  }
}

const linkIdExist = async (id) => {
  const idExist = await Link.findById(id)
  if (!idExist) {
    throw new Error(`link id: ${id} not exists`)
  }
}

const titleExist = async (title = '') => {
  const existTitle = await Link.findOne({ title })
  if (existTitle) {
    throw new Error(`The title: ${title} already exists in the database`)
  }
}

const titleValidate = async (title) => {
  if (title.includes(' ')) {
    throw new Error('The title cannot contain spaces')
  }
}

const urlValidate = async (url) => {
  try {
    // eslint-disable-next-line
    new URL(url)
  } catch (error) {
    throw new Error('url not valid')
  }
}

module.exports = {
  emailExist,
  userIdExist,
  titleValidate,
  titleExist,
  linkIdExist,
  urlValidate
}

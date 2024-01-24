const { response, request } = require('express')
const Link = require('../models/link')
const { rest } = require('../config/api')

const linksGet = async (req = request, res = response) => {
  const { defaultLimit, maxLimit } = rest
  const { limit = defaultLimit, from = 0 } = req.query
  const [linksCount, links] = await Promise.all([
    Link.countDocuments(),
    Link.find()
      .skip(Number(from))
      .limit(parseInt(limit > maxLimit ? maxLimit : limit))
      .populate('userId')
  ])

  res.json({
    count: linksCount,
    links
  })
}

const linkGetById = async (req = request, res = response) => {
  const { id } = req.params
  const link = await Link.findById(id)
  if (!link) {
    res.status(404).json({ msg: 'Not Found' })
  } else res.json(link)
}

const linksGetByUser = async (req = request, res = response) => {
  const { defaultLimit, maxLimit, user } = rest
  const { limit = defaultLimit } = req.query
  const userId = { userId: user }
  const [linksCount, links] = await Promise.all([
    Link.countDocuments(userId),
    Link.find(userId)
      .limit(parseInt(limit > maxLimit ? maxLimit : limit))
  ])

  res.json({
    count: linksCount,
    links
  })
}

const linksPut = async (req, res = response) => {
  const { id } = req.params
  // eslint-disable-next-line
  const { _id, userId, created_at, updated_at, ...args } = req.body

  const link = await Link.findByIdAndUpdate(id, { ...args, updated_at: new Date() })

  res.json(link)
}

const linksPost = async (req, res = response) => {
  const { title, url, userId } = req.body
  const link = new Link({ title, url, userId })
  await link.save()
  res.json(link)
}

const linksDelete = async (req, res = response) => {
  const { id } = req.params

  // delete data
  const link = await Link.findByIdAndDelete(id)

  res.json(link)
}

module.exports = {
  linksGet,
  linkGetById,
  linksGetByUser,
  linksPut,
  linksPost,
  linksDelete
}

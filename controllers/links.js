const { response, request } = require('express')
const Link = require('../models/link')
const { rest } = require('../config/api')

const linksGet = async (req = request, res = response) => {
  // #swagger.tags = ['Links']
  // #swagger.summary = 'Endpoint to List Links'
  //  #swagger.parameters['limit'] = { description: 'Maximum amount to obtain.', name: 'limit', required: false }
  //  #swagger.parameters['from'] = { description: 'Management of paginations, allowing you to start from a specific record.', name: 'from', required: false }
  const { defaultLimit, maxLimit } = rest
  const { limit = defaultLimit, from = 0 } = req.query
  const [count, links] = await Promise.all([
    Link.countDocuments(),
    Link.find()
      .skip(Number(from))
      .limit(parseInt(limit > maxLimit ? maxLimit : limit))
      .populate('userId')
  ])

  res.json({
    count,
    links
  })
}

const linkGetById = async (req = request, res = response) => {
  // #swagger.tags = ['Links']
  // #swagger.summary = 'Endpoint to get a Link'
  // #swagger.parameters['id'] = { description: 'A valid id mongo link identifier.', name: 'id', required: true }
  const { id } = req.params
  const link = await Link.findById(id)
  if (!link) {
    res.status(404).json({ msg: 'Not Found' })
  } else res.json(link)
}

const linksGetByUser = async (req = request, res = response) => {
  // #swagger.tags = ['Links']
  // #swagger.summary = 'Endpoint to List Links from a specific user'
  //  #swagger.parameters['userId'] = { description: 'A valid id mongo user identifier.', name: 'userId', required: true }
  /* #swagger.security = [{
            "X-API-Key": []
    }] */
  const { userId } = req.params
  const userAuthenticated = req.userAuthenticated
  if (userId !== userAuthenticated._id + '') {
    return res.status(403).json({
      msg: 'Forbidden'
    })
  }

  const [count, links] = await Promise.all([
    Link.countDocuments({ userId }),
    Link.find({ userId })
  ])

  res.json({
    count,
    links
  })
}

const linksPut = async (req, res = response) => {
  // #swagger.tags = ['Links']
  // #swagger.summary = 'Endpoint to update a Link'
  //  #swagger.parameters['id'] = { description: 'A valid id mongo link identifier.', name: 'id', required: true }
  // #swagger.responses[409] = { description: 'An title already exists' }
  const { id } = req.params
  // eslint-disable-next-line
  const { _id, userId, created_at, updated_at, ...args } = req.body

  const link = await Link.findByIdAndUpdate(id, { ...args, updated_at: new Date() })

  res.json(link)
}

const linksPost = async (req, res = response) => {
  // #swagger.tags = ['Links']
  // #swagger.summary = 'Endpoint to create a Link'
  // #swagger.responses[409] = { description: 'An title already exists' }
  const { title, url, userId } = req.body
  const link = new Link({ title, url, userId })
  await link.save()
  res.json(link)
}

const linksDelete = async (req, res = response) => {
  // #swagger.tags = ['Links']
  //  #swagger.parameters['id'] = { description: 'A valid id mongo link identifier.', name: 'id', required: true }
  // #swagger.summary = 'Endpoint to delete a Link'
  const { id } = req.params

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

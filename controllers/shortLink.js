const { request, response } = require('express')
const Link = require('../models/link')

const shortLink = async (req = request, res = response) => {
  // #swagger.tags = ['ShortLink']
  // #swagger.summary = 'Endpoint get URL by title'
  // #swagger.description = 'Get shortened link title to return full url'
  //  #swagger.parameters['title'] = { description: 'Title of shortlink.', name: 'title' }
  // #swagger.responses[200] = { description: 'A title exists' }
  // #swagger.responses[404] = { description: 'A title not exists' }

  const { title } = req.params
  const link = await Link.findOne({ title })
  if (!link) {
    // return res.redirect('/')
    return res.status(404).json({ msg: 'Not Found' })
  }
  // res.redirect(link.url)
  res.status(200).json({ url: link.url, id: link.id })
}

module.exports = { shortLink }

const Joi = require('joi')

module.exports = Joi.object({
  moduleSwitch: Joi.boolean().default(true)
    .description('Master switch of module'),
  exclude: Joi.array().items(Joi.string()).single().default([])
    .description('exclude pull request title'),
  deleteClosedPr: Joi.boolean().default(true)
    .description('Delete closed pull request?')
})

const Joi = require('joi')

module.exports = Joi.object({
  moduleSwitch: Joi.boolean().default(true)
    .description('Master switch of module'),

  assignOnNewIssue: Joi.boolean().default(true)
    .description('assign On New Issue'),

  assignOnNewPullRequest: Joi.boolean().default(true)
    .description('assign On New Pull Request'),

  reviewOnNewPullRequest: Joi.boolean().default(true)
    .description('review On New Pull Request')
})

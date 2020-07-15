const Joi = require('joi')

module.exports = Joi.object({
  moduleSwitch: Joi.boolean().default(true)
    .description('Master switch of module'),
  respondOnNewIssue: Joi.boolean().default(true)
    .description('respond On New Issue?'),
  respondOnNewPullRequest: Joi.boolean().default(true)
    .description('respond On New Pull Request?'),
  respondOnMyIssue: Joi.boolean().default(true)
    .description('respond On My New Issue?'),
  respondOnMyPullRequest: Joi.boolean().default(true)
    .description('respond On My New Pull Request?'),
  issueRespond: Joi.string().default('Thanks for opening this issue!')
    .description('issue respond message string'),
  pullRequestRespond: Joi.string().default('Thanks for opening this pull request!')
    .description('pull request respond message string')
})

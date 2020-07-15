const getConfiguration = require('../getConfig')
const configSchema = require('./config-schema')

module.exports = async (context) => {
  const configFile = await getConfiguration(context)
  if (configFile && configFile.configMaster && !configFile.configMaster.moduleSwitch) return

  const configValue = (configFile && configFile.configAssigner) ? configFile.configAssigner : {}
  const { value: config, error } = configSchema.validate(configValue)

  if (config && !config.moduleSwitch) return

  if (context.payload.pull_request) {
    const pullRequest = context.payload.pull_request

    if ((!pullRequest.assignees || pullRequest.assignees.length === 0) && config.assignOnNewPullRequest) {
      await context.github.issues.addAssignees(context.issue({ assignees: context.payload.repository.owner.login }))
    }

    if ((!pullRequest.reviewers || pullRequest.reviewers.length === 0) && config.reviewOnNewPullRequest) {
      if (pullRequest.user.login === context.payload.repository.owner.login) return
      await context.github.pulls.createReviewRequest(context.issue({ reviewers: [context.payload.repository.owner.login] }))
    }
  }

  if (context.payload.issue) {
    const issue = context.payload.issue

    if ((!issue.assignees || issue.assignees.length === 0) && config.assignOnNewIssue) {
      await context.github.issues.addAssignees(context.issue({ assignees: context.payload.repository.owner.login }))
    }
  }

}

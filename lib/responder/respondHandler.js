const getConfiguration = require('../getConfig')
const configSchema = require('./config-schema')

module.exports = async (context) => {
  const configFile = await getConfiguration(context)
  if (configFile && configFile.configMaster && !configFile.configMaster.moduleSwitch) return

  const configValue = (configFile && configFile.configRespond) ? configFile.configRespond : {}
  const { value: config, error } = configSchema.validate(configValue)

  if (config && !config.moduleSwitch) return

  if (context.payload.pull_request) {
    if (config && !config.respondOnNewPullRequest) return

    if (context.payload.pull_request.user.login === context.payload.repository.owner.login && (config && !config.respondOnMyPullRequest)) return

    let respondContent = 'Thanks for opening this pull request!'
    if (config && config.pullRequestRespond) respondContent = config.pullRequestRespond

    return await context.github.issues.createComment(context.issue({ body: respondContent }))
  }

  if (context.payload.issue) {
    if (config && !config.respondOnNewIssue) return

    if (context.payload.issue.user.login === context.payload.repository.owner.login && (config && !config.respondOnMyIssue)) return

    let respondContent = 'Thanks for opening this issue!'
    if (config && config.issueRespond) respondContent = config.issueRespond

    return await context.github.issues.createComment(context.issue({ body: respondContent }))
  }
}

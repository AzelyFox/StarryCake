const forRepository = require('./forRepository')

module.exports = async function unmark (context, app, scheduler) {
  if (!context.isBot) {
    const stale = await forRepository(context, app, scheduler)
    let issue = context.payload.issue || context.payload.pull_request
    const type = context.payload.issue ? 'issues' : 'pulls'

    if (!issue.labels) {
      try {
        issue = (await context.github.issues.get(context.issue())).data
      } catch (error) {
        context.log('Issue not found')
      }
    }

    const staleLabelAdded = context.payload.action === 'labeled' &&
      context.payload.label.name === stale.config.staleLabel

    if (stale.hasStaleLabel(type, issue) && issue.state !== 'closed' && !staleLabelAdded) {
      await stale.unmarkIssue(type, issue)
    }
  }
}
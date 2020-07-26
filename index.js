const probotScheduler = require('probot-scheduler')
const probotCommands = require('probot-commands')
const assignHandler = require('./lib/assigner/assignHandler')
const deleteBranch = require('./lib/delete-merged-branch/delete-merged-branch')
const staleUnmark = require('./lib/stale/unmark')
const staleMarkAndSweep = require('./lib/stale/mark-and-sweep')
const todoPullRequestHandler = require('./lib/todo/pull-request-handler')
const todoPullRequestMergedHandler = require('./lib/todo/pull-request-merged-handler')
const todoPushHandler = require('./lib/todo/push-handler')
const todoIssueRenameHandler = require('./lib/todo/issue-rename-handler')
const todoIgnoreRepos = require('./lib/todo/ignore-repos')
const reminder = require('./lib/reminder/reminders')
const respondHandler = require('./lib/responder/respondHandler')
const triageHandler = require('./lib/triage/triageHandler')
const triageCheck = require('./lib/triage/check')
const unfurlHandler = require('./lib/unfurl/unfurlHandler')

module.exports = app => {
  app.log.warn('StarryCake Loaded')

  const appScheduler = probotScheduler(app, { interval: 30 * 60 * 1000 })

  // ASSIGNER
  app.on(['issues.opened','pull_request.opened'], assignHandler)

  // DELETE-MERGED-BRANCH
  app.on('pull_request.closed', deleteBranch)

  // REMINDER
  probotCommands(app, 'remind', reminder.set)
  app.on('schedule.repository', reminder.check)

  // STALE
  app.on(['issue_comment', 'issues', 'pull_request', 'pull_request_review', 'pull_request_review_comment'], async context => {
    await staleUnmark(context, app, appScheduler)
  })
  app.on('schedule.repository', async context => {
    await staleMarkAndSweep(context, app, appScheduler)
  })

  // TO-DO
  app.on(['pull_request.opened', 'pull_request.synchronize'], todoIgnoreRepos(todoPullRequestHandler))
  app.on('pull_request.closed', todoIgnoreRepos(todoPullRequestMergedHandler))
  app.on('push', todoIgnoreRepos(todoPushHandler))
  app.on('issues.edited', todoIgnoreRepos(todoIssueRenameHandler))

  // TRIAGE
  app.on(['issues.opened','issues.reopened','pull_request.opened','pull_request.reopened'], triageHandler)
  app.on(['issues.labeled','pull_request.labeled'], triageCheck)

  // RESPOND
  app.on(['issues.opened','issues.reopened','pull_request.opened','pull_request.reopened'], respondHandler)

  // UNFURL
  app.on(['issues.opened','issue_comment.created','pull_request.opened'], unfurlHandler)

  // LOGGING
  app.on('issues', async (context) => { app.log.warn('issues') })
  app.on('issues.opened', async (context) => { app.log.warn('issues.opened') })
  app.on('issues.reopened', async (context) => { app.log.warn('issues.reopened') })
  app.on('issues.edited', async (context) => { app.log.warn('issues.edited') })
  app.on('issues.labeled', async (context) => { app.log.warn('issues.labeled') })
  app.on('issue_comment', async (context) => { app.log.warn('issue_comment') })
  app.on('issue_comment.created', async (context) => { app.log.warn('issue_comment.created') })
  app.on('pull_request', async (context) => { app.log.warn('pull_request') })
  app.on('pull_request.opened', async (context) => { app.log.warn('pull_request.opened') })
  app.on('pull_request.reopened', async (context) => { app.log.warn('pull_request.reopened') })
  app.on('pull_request.labeled', async (context) => { app.log.warn('pull_request.labeled') })
  app.on('pull_request.closed', async (context) => { app.log.warn('pull_request.closed') })
  app.on('pull_request_review', async (context) => { app.log.warn('pull_request_review') })
  app.on('pull_request_review_comment', async (context) => { app.log.warn('pull_request_review_comment') })
  app.on('push', async (context) => { app.log.warn('push') })
  app.on('schedule.repository', async (context) => { app.log.warn('schedule.repository') })

}

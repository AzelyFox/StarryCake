/**
 * Created By SvanBoxel
 * https://github.com/SvanBoxel/delete-merged-branch
 */
const getConfiguration = require('../getConfig')
const configSchema = require('./config-schema')

module.exports = async (context) => {
  const configFile = await getConfiguration(context)
  if (configFile && configFile.configMaster && !configFile.configMaster.moduleSwitch) return

  const configValue = (configFile && configFile.configDeleteBranch) ? configFile.configDeleteBranch : {}
  const { value: config, error } = configSchema.validate(configValue)

  if (config && !config.moduleSwitch) return

  const headRepoId = context.payload.pull_request.head.repo.id
  const baseRepoId = context.payload.pull_request.base.repo.id

  const owner = context.payload.repository.owner.login
  const repo = context.payload.repository.name
  const branchName = context.payload.pull_request.head.ref
  const ref = `heads/${branchName}`

  if (headRepoId !== baseRepoId) {
    context.log.info(`Closing PR from fork. Keeping ${context.payload.pull_request.head.label}`)
    return
  }

  if (config.exclude && config.exclude.some((rule) => new RegExp(`^${rule.split('*').join('.*')}$`).test(branchName))) {
    context.log.info(`Branch ${branchName} excluded. Keeping ${context.payload.pull_request.head.label}`)
    return
  }

  const isMerged = context.payload.pull_request.merged
  if (!isMerged && config.deleteClosedPr === false) {
    context.log.info(`PR was closed but not merged. Keeping ${owner}/${repo}/${ref}`)
    return
  }

  try {
    await context.github.git.deleteRef({ owner, repo, ref })
    context.log.info(`Successfully deleted ${owner}/${repo}/${ref} which was ${isMerged ? 'merged' : 'closed'}`)
  } catch (e) {
    context.log.warn(e, `Failed to delete ${owner}/${repo}/${ref}`)
  }
}

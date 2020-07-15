const unfurl = require('./unfurl')
const getConfiguration = require('../getConfig')
const configSchema = require('./config-schema')

module.exports = async (context) => {
  const configFile = await getConfiguration(context)
  if (configFile && configFile.configMaster && !configFile.configMaster.moduleSwitch) return

  const configValue = (configFile && configFile.configUnfurl) ? configFile.configUnfurl : {}
  const { value: config, error } = configSchema.validate(configValue)

  if (config && !config.moduleSwitch) return

  if (context.payload.comment) return unfurl(context, context.payload.comment.body)
  if (context.payload.pull_request) return unfurl(context, context.payload.pull_request.body)
  if (context.payload.issue) return unfurl(context, context.payload.issue.body)

}
const getConfiguration = require('../getConfig')
const configSchema = require('./config-schema')

module.exports = async function triage (context) {
  const configFile = await getConfiguration(context)
  if (configFile && configFile.configMaster && !configFile.configMaster.moduleSwitch) return

  const configValue = (configFile && configFile.configTriage) ? configFile.configTriage : {}
  const { value: config, error } = configSchema.validate(configValue)

  if (config && !config.moduleSwitch) return

  let triageLabel = 'triage'
  if (config && config.triageLabel) triageLabel = config.triageLabel

  if (context.payload.pull_request && context.payload.pull_request.labels.length === 0) {
    return await context.github.issues.addLabels(context.issue({ labels: [triageLabel] }))
  }

  if (context.payload.issue && context.payload.issue.labels.length === 0) {
    return await context.github.issues.addLabels(context.issue({ labels: [triageLabel] }))
  }
}
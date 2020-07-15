const getConfiguration = require('../getConfig')
const configSchema = require('./config-schema')

module.exports = async function check (context) {
  const configFile = await getConfiguration(context)
  if (configFile && configFile.configMaster && !configFile.configMaster.moduleSwitch) return

  const configValue = (configFile && configFile.configTriage) ? configFile.configTriage : {}
  const { value: config, error } = configSchema.validate(configValue)

  if (config && !config.moduleSwitch) return

  let triageLabel = 'triage'
  if (config && config.triageLabel) triageLabel = config.triageLabel

  if (context.payload.label && context.payload.label.name !== triageLabel) {
    if (context.payload.issue) {
      if (context.payload.issue.labels && context.payload.issue.labels.length > 0) {
        for (let i = 0; i < context.payload.issue.labels.length; i ++) {
          if (context.payload.issue.labels[i].name === triageLabel) {
            return await context.github.issues.removeLabel(context.issue({ name: triageLabel }))
          }
        }
      }
    }
    if (context.payload.pull_request) {
      if (context.payload.pull_request.labels && context.payload.pull_request.labels.length > 0) {
        for (let i = 0; i < context.payload.pull_request.labels.length; i ++) {
          if (context.payload.pull_request.labels[i].name === triageLabel) {
            return await context.github.issues.removeLabel(context.issue({ name: triageLabel }))
          }
        }
      }
    }
  }
}
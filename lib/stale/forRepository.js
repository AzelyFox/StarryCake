const Stale = require('./stale')
const getConfiguration = require('../getConfig')
const configSchema = require('./config-schema')

module.exports = async function forRepository (context, app, scheduler) {
  const configFile = await getConfiguration(context)
  if (configFile && configFile.configMaster && !configFile.configMaster.moduleSwitch) {
    scheduler.stop(context.payload.repository)
  }

  const configValue = (configFile && configFile.configStale) ? configFile.configStale : {}
  let { value: config, error } = configSchema.validate(configValue)

  if (config && !config.moduleSwitch) {
    scheduler.stop(context.payload.repository)
    config = { perform: false }
  }

  config = Object.assign(config, context.repo({ logger: app.log }))

  return new Stale(context.github, config)
}
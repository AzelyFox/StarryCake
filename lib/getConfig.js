module.exports = async function getConfiguration (context) {
  if (!context) return
  const configFile = await context.config('starrycake.yml')
  if (!configFile) return configFile
  configFile.configMaster = (configFile && configFile.starrycake) ? configFile.starrycake : {};
  configFile.configAssigner = (configFile && configFile.assigner) ? configFile.assigner : {};
  configFile.configDeleteBranch = (configFile && configFile.deletebranch) ? configFile.deletebranch : {};
  configFile.configReminder = (configFile && configFile.reminder) ? configFile.reminder : {};
  configFile.configRespond = (configFile && configFile.responder) ? configFile.responder : {};
  configFile.configStale = (configFile && configFile.stale) ? configFile.stale : {};
  configFile.configTodo = (configFile && configFile.todo) ? configFile.todo : {};
  configFile.configTriage = (configFile && configFile.triage) ? configFile.triage : {};
  configFile.configUnfurl = (configFile && configFile.unfurl) ? configFile.unfurl : {};
  return configFile
}

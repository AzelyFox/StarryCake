const forRepository = require('./forRepository')

module.exports = async function markAndSweep (context, app, scheduler) {
  const stale = await forRepository(context, app, scheduler)
  await stale.markAndSweep('pulls')
  await stale.markAndSweep('issues')
}
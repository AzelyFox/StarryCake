const Joi = require('joi')

module.exports = Joi.object({
  moduleSwitch: Joi.boolean().default(true)
    .description('Master switch of module'),
  triageLabel: Joi.string().default('triage')
    .description('Label name when becomes triage status')
})

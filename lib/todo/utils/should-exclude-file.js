/**
 * Created By JasonEtco
 * https://github.com/JasonEtco/todo
 */

const alwaysExclude = /\.min\./

module.exports = (logger, filename, excludePattern) => {
  if (filename === '.github/starrycake.yml') {
    logger.debug('Skipping .github/starrycake.yml')
    return true
  } else if (alwaysExclude.test(filename)) {
    logger.debug('Skipping ' + filename + ' as it matches the the alwaysExclude pattern')
    return true
  } else if (excludePattern && new RegExp(excludePattern).test(filename)) {
    logger.debug('Skipping ' + filename + ' as it matches the exclude pattern ' + excludePattern)
    return true
  }
}

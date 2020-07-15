const { JSDOM } = require('jsdom')

module.exports = html => {
  let links = []
  links = html.match(/\bhttps?:\/\/\S+/gi);

  return Array.from(new Set(links))
}

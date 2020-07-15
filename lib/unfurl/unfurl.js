const unfurlToAttachment = require('./unfurl-to-attachment')
const attachments = require('./probot-attachments/index')
const getLinks = require('./get-links')

module.exports = async function unfurl (context, html) {
  const links = getLinks(html)

  if (links.length > 0) {
    const unfurls = await Promise.all(links.map(link => unfurlToAttachment(link)))
    return attachments(context).add(unfurls)
  }
}

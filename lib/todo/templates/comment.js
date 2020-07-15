/**
 * Created By JasonEtco
 * https://github.com/JasonEtco/todo
 */

module.exports = `## {{ title }}

{{#if body}}
{{ body }}

---

{{/if}}
{{#if range}}
https://{{ githubHost }}/{{ owner }}/{{ repo }}/blob/{{ sha }}/{{ filename }}#{{ range }}

---

{{/if}}
###### This comment is based on a \`{{ keyword }}\` comment in {{ sha }} in #{{ number }}.{{ assignedToString }}`

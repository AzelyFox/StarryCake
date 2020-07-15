/**
 * Created By JasonEtco
 * https://github.com/JasonEtco/todo
 */

module.exports = `{{#if body}}
{{ body }}

---

{{/if}}
{{#if range}}
https://{{ githubHost }}/{{ owner }}/{{ repo }}/blob/{{ sha }}/{{ filename }}#{{ range }}

---

{{/if}}
###### This issue is based on a \`{{ keyword }}\` comment in {{ sha }} when #{{ number }} was merged.{{ assignedToString }}`

const os = require('os')
const fs = require('fs')
const path = require("path")
const exists = (filepath) => {
  return new Promise(r=>fs.access(filepath, fs.constants.F_OK, e => r(!e)))
}
module.exports = {
  title: "audiocraft_plus",
  description: "One click installer for AudioCraft_plus",
  icon: "icon.jpeg",
  menu: async (kernel) => {
    let installed = await exists(path.resolve(__dirname, "audiocraft_plus", "env"))
    if (installed) {
      let session = (await kernel.loader.load(path.resolve(__dirname, "session.json"))).resolved
      return [{
        when: "start.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running",
        type: "label",
      }, {
        when: "start.json",
        off: "<i class='fa-solid fa-power-off'></i> Start",
        href: "start.json?fullscreen=true&run=true",
      }, {
        when: "start.json",
        on: "<i class='fa-solid fa-rocket'></i> Open audiocraft_plus web UI",
        href: (session && session.url ? session.url : "http://127.0.0.1:7860"),
        target: "_blank"
      }]
    } else {
      return [{
        html: '<i class="fa-solid fa-plug"></i> Install',
        href: "install.json?run=true&fullscreen=true"
      }]
    }
  }
}

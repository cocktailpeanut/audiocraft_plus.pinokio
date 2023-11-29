module.exports = {
  title: "audiocraft_plus",
  description: "One click installer for AudioCraft_plus",
  icon: "icon.jpeg",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "audiocraft_plus", "env")
    if (installed) {
      let session = await kernel.require(__dirname, "session.json")
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

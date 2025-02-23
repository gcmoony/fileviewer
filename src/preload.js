// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron")

//
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    // Listening channels defined in main
    let validChannels = ["sendToMain", "sendFilePath", "getFileDialog"]
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, func) => {
    // Emitting channels defined in main
    let validChannels = ["sendFromMain", "receiveFilePath", "receiveFileDialog"]
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => {
        func(...args)
      })
    }
  },
})

// === Example from Electron Tutorial ===
// contextBridge.exposeInMainWorld("versions", {
//   node: () => process.version.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.version.electron,
// })
// === End of example ===

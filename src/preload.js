// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron")

//
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    // Listening channels defined in main
    let validChannels = ["openNewFileReq"]
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, func) => {
    // Emitting channels defined in main
    let validChannels = ["openNewFileRes"]
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => {
        func(...args)
      })
    }
  },
})

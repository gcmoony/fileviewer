import { app, BrowserWindow, dialog, ipcMain, webUtils } from "electron"
import path from "node:path"
const fs = require("fs")
import started from "electron-squirrel-startup"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

let mainWindow
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    icon: "./public/FileView.png",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    )
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Open new file listener
ipcMain.on("openNewFileReq", async (event, ...args) => {
  // Open file dialog
  let selectedFile, fileAbsPath, fileName
  try {
    // Select file from dialog
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
      filters: [{ name: "Markdown", extensions: ["md"] }],
    })
    if (!canceled) {
      // Set the absolute path
      fileAbsPath = filePaths[0]
      app.addRecentDocument(fileAbsPath)

      // Get the file name
      let temp = fileAbsPath.split("\\")
      fileName = temp[temp.length - 1]

      // Parse the file, return the content
      try {
        const data = fs.readFileSync(fileAbsPath, "utf-8")
        mainWindow.webContents.send("openNewFileRes", {
          fileContent: data,
          fileName: fileName,
          filePath: fileAbsPath,
        })

        // Write the file path
      } catch (err) {
        console.log(err)
      }
    }
  } catch (err) {
    console.log(err)
  }
})

// Open recent file listener
ipcMain.once("openRecentFileReq", async (event, args) => {
  // Try opening the file
  try {
    const data = fs.readFileSync(args.path, "utf-8")
    mainWindow.webContents.send("openRecentFileRes", {
      fileContent: data,
    })
  } catch (err) {
    console.log(err)
  }
})

// https://www.electronjs.org/docs/latest/tutorial/recent-documents

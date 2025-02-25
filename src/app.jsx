import * as React from "react"
import { createRoot } from "react-dom/client"
import FilePicker from "./FilePicker"
import Navbar from "./Navbar"
import FileViewer from "./FileViewer"
import RecentFiles from "./RecentFiles"

const root = createRoot(document.getElementById("root"))
root.render(
  <>
    <App />
  </>
)

function App() {
  const [viewerCtx, setViewerCtx] = React.useState()
  const [recentFileList, setRecentFileList] = React.useState([])
  const [fileNameList, setFileNameList] = React.useState([])

  // Request to open new file
  function openNewFile() {
    window.api.send("openNewFileReq", "Requesting a new file")
  }
  // Listen for open new file response
  window.api.receive("openNewFileRes", (data) => {
    // Add file to set if it doesn't exist
    setRecentFileList((prev) => {
      return prev.includes(data.filePath)
        ? [data.filePath, ...prev.filter((item) => item != data.filePath)]
        : [data.filePath, ...prev]
    })
    setFileNameList((prev) => {
      return prev.includes(data.fileName)
        ? [data.fileName, ...prev.filter((item) => item != data.fileName)]
        : [data.fileName, ...prev]
    })
    // Set the viewer context
    setViewerCtx(data.fileContent)
  })

  // Request to open recent file
  function openRecentFile(filePath) {
    window.api.send("openRecentFileReq", {
      message: "Requesting file from file name",
      path: filePath,
    })
  }
  // Listen for open recent file
  window.api.receive("openRecentFileRes", (data) => {
    setViewerCtx(data.fileContent)
  })

  return (
    <>
      <Navbar />
      <main>
        <FilePicker fileSelector={openNewFile} />

        <RecentFiles
          filePaths={recentFileList}
          fileNames={fileNameList}
          requestFile={openRecentFile}
        />

        {viewerCtx && <FileViewer fileText={viewerCtx} />}
      </main>
    </>
  )
}

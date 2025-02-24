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
  const [currentView, setCurrentView] = React.useState()

  const [viewerCtx, setViewerCtx] = React.useState()

  const [recentFileList, setRecentFileList] = React.useState([])

  // Request to open new file
  function openNewFile() {
    window.api.send("openNewFileReq", "Requesting a new file")
  }
  // Listen for response
  window.api.receive("openNewFileRes", (data) => {
    console.log(data)
  })

  // Request to open file from file name

  // function sendFilepathToMain(filePath) {
  //   window.api.send("sendFilePath", filePath)
  // }

  // function getFileDialog() {
  //   window.api.send("getFileDialog", ["Requesting file selection dialog"])
  // }

  // function requestFile(fileName = None) {
  //   window.api.send("getFileDialog", ["Reopen file", fileName])
  // }

  window.api.receive("receiveFileDialog", (data) => {
    const tempList = [...recentFileList]
    !tempList.includes(...data.fileName) &&
      setRecentFileList([...data.fileName, ...recentFileList])
    setViewerCtx(data.data)
  })

  return (
    <>
      <Navbar />
      <main>
        {/* <FilePicker
          fileSubmitter={sendFilepathToMain}
          fileSelector={getFileDialog}
        /> */}

        {/* <RecentFiles
          fileSet={recentFileList}
          requestFile={requestFile}
        /> */}

        {/* {viewerCtx && <FileViewer fileText={viewerCtx} />} */}
      </main>
    </>
  )
}

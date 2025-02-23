import * as React from "react"
import { createRoot } from "react-dom/client"
import FilePicker from "./FilePicker"
import Navbar from "./Navbar"
import FileViewer from "./FileViewer"

const root = createRoot(document.getElementById("root"))
root.render(
  <>
    <App />
  </>
)

function App() {
  // Example functions for sending and receiving from main
  // =====================================
  // Sending
  // const example1 = window.api.receive("sendFromMain", (data) => {
  //   console.log("Received message from main!")
  //   console.log(data.message)
  //   // setMsg(data.message)
  // })
  // // Receiving
  // const example2 = window.api.send("sendToMain", "Hello from app")
  // =====================================
  const [viewerCtx, setViewerCtx] = React.useState()

  function sendFilepathToMain(filePath) {
    window.api.send("sendFilePath", filePath)
  }

  function getFileDialog() {
    window.api.send("getFileDialog", "Requesting file selection dialog")
  }

  // const [aFile, setAFile] = React.useState()
  window.api.receive("receiveFileDialog", (data) => {
    setViewerCtx(data.data)
  })

  return (
    <>
      <Navbar />
      {/* <div>{msg ? `From main: ${msg}` : "Loading message"}</div> */}
      <main>
        <FilePicker
          fileSubmitter={sendFilepathToMain}
          fileSelector={getFileDialog}
        />

        {viewerCtx && <FileViewer fileText={viewerCtx} />}

        <div id='info'></div>
      </main>
    </>
  )
}

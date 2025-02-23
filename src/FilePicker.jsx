import React, { useState } from "react"
export default function FilePicker({ fileSubmitter, fileSelector }) {
  const [viewingFile, setViewingFile] = useState()

  function handleFileUpload(e) {
    e.preventDefault()
    fileSubmitter(e.target[0].value)
  }

  function selectFile() {
    fileSelector()
  }

  return (
    <div>
      <button
        className='button primary'
        onClick={selectFile}
      >
        Open File...
      </button>
    </div>
  )
}

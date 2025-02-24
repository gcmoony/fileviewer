import React, { useEffect, useState } from "react"

export default function RecentFiles({ fileSet, requestFile }) {
  const [files, setFiles] = useState([])
  // const [selectedFile, setSelectedFile] = useState([])
  useEffect(() => {
    setFiles(fileSet)
  }, [fileSet])

  function handleFileSelect(e) {
    console.log(e.target.value)
    requestFile(e.target.value)
  }

  return (
    <div className='file-picker-container'>
      <select
        onChange={(e) => handleFileSelect(e)}
        disabled={files.length < 1}
      >
        {files.map((fileName, index) => {
          let temp = fileName.split("\\")
          let trueName = temp[temp.length - 1]
          return (
            <option
              key={index}
              value={fileName}
            >
              {trueName}
            </option>
          )
        })}
      </select>
    </div>
  )
}

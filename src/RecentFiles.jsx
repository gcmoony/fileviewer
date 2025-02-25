import React, { useEffect, useState } from "react"

export default function RecentFiles({ fileNames, filePaths, requestFile }) {
  console.log(fileNames)

  function handleFileSelect(fileString) {
    const fileStringIndex = fileNames.findIndex((item) => item == fileString)
    const filePath = filePaths[fileStringIndex]
    console.log(filePath)
    requestFile(filePath)
  }
  return (
    <div className='file-picker-container'>
      <select
        onChange={(e) => handleFileSelect(e.target.value)}
        disabled={fileNames.length < 1}
      >
        {fileNames.map((fileName, index) => {
          return (
            <option
              key={index}
              value={fileName}
            >
              {fileName}
            </option>
          )
        })}
      </select>
    </div>
  )
}

import React, { useState } from "react"
export default function FilePicker({ fileSelector }) {
  return (
    <div>
      <button
        className='button primary'
        onClick={fileSelector}
      >
        Open File...
      </button>
    </div>
  )
}

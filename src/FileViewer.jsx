import React, { useEffect, useState } from "react"
import { marked } from "marked"
import purify from "dompurify"

marked.use({
  breaks: true,
})

export default function FileViewer({ fileText }) {
  const [text, setText] = useState()

  useEffect(() => {
    parseFile()
  }, [fileText])
  function parseFile() {
    const parsedText = purify.sanitize(marked(fileText))
    setText((e) => {
      return parsedText
    })
  }

  return (
    <div
      className='viewer'
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  )
}

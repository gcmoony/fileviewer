import React, { useEffect, useState } from "react"
import { marked } from "marked"
import purify from "dompurify"
import hljs from "highlight.js"

marked.use({
  breaks: true,
})

export default function FileViewer({ fileText }) {
  const [text, setText] = useState()

  useEffect(() => {
    let preview = document.getElementById("preview")
    parseFile()
    document.querySelectorAll("code").forEach((elem) => {
      // hljs.highlightElement(elem)
    })
  }, [fileText])
  function parseFile() {
    const parsedText = purify.sanitize(marked(fileText))
    setText(parsedText)
  }

  return (
    <div
      className='viewer'
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  )
}

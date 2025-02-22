import * as React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"
import App from "./app"
import Home from "./Pages/Home"
import About from "./Pages/About"

const root = createRoot(document.body)
root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='about'
          element={<About />}
        />
      </Routes>
    </App>
  </BrowserRouter>
)

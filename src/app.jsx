import React from "react"
import { NavLink } from "react-router"

export default function App({ children }) {
  return (
    <div>
      {/* Nav Bar */}
      <nav>
        {/* Logo Stuff */}
        <div className='logo'>
          <h1>FileView</h1>
          <p>The File Viewing app</p>
        </div>
        {/* Links */}
        <div className='nav-links'>
          <NavLink
            to={"/"}
            end
          >
            Home
          </NavLink>
          <NavLink
            to={"/about"}
            end
          >
            About
          </NavLink>
        </div>
      </nav>
      {/* Document Content */}
      {children}
    </div>
  )
}

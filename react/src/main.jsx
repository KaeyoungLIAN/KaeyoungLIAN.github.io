import React from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './Portfolio'

var root = document.getElementById('portfolio-root')
if (root) {
  ReactDOM.createRoot(root).render(
    React.createElement(React.StrictMode, null,
      React.createElement(Portfolio, null)
    )
  )
}

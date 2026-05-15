import React from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './Portfolio'

const root = document.getElementById('portfolio-root')
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Portfolio />
    </React.StrictMode>
  )
}

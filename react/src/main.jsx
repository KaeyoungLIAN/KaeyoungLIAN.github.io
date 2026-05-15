// Vite build entry — builds into assets/js/_react/bundle.js
// The built bundle.js is then copied to assets/js/ by the build script

import React from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './Portfolio'

ReactDOM.createRoot(document.getElementById('portfolio-root')).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
)

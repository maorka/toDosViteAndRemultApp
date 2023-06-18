import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Auth from './Auth'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth />
    {/* <App /> */}
  </React.StrictMode>,
)

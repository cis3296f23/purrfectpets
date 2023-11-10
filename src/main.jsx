import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import LoginSignup from './components/LoginComponents/LoginSignup.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginSignup/>
  </React.StrictMode>,
)

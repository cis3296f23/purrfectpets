import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginSignup from './components/LoginComponents/LoginSignup.jsx'
import Account from './components/AccountComponents/Account.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/app" element={<App />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
  </React.StrictMode>,
)
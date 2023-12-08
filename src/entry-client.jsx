/**
 * entry point for client SSR
 */

import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoginSignup from './components/LoginComponents/LoginSignup.jsx'
import Account from './components/AccountComponents/Account.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/app" element={<App />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
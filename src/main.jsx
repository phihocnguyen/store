import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SocketContextProvider } from './context/SocketContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthContextProvider>
          <SocketContextProvider>
            <App/>
          </SocketContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  </BrowserRouter>

)

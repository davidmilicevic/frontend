import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App'
import { HranaContextProvider } from './context/HranaContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <HranaContextProvider>
    <App />
    </HranaContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);



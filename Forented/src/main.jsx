import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <ScrollToTop/>
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
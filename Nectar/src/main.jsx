import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider, CartProvider } from './Context/CartContext.jsx'
import { AddressProvider } from './Context/AddressContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <AddressProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </AddressProvider>
    </AuthProvider>
  </StrictMode>,
)

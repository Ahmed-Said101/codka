import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/sora/latin-500.css'
import '@fontsource/sora/latin-600.css'
import '@fontsource/great-vibes/latin-400.css'
import './index.css'
import App from './App'
import { CartProvider } from './context/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)

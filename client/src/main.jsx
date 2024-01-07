import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import ContextProvider from './Context/context';
import CartContextProvider from './CartContext/context'; 

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
  <ContextProvider>
    <CartContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartContextProvider>
  </ContextProvider>
</React.StrictMode>,
)

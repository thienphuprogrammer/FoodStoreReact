import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "./hooks/useCart.jsx";
import './axiosConfig.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <CartProvider>
            <App />
          </CartProvider>
      </BrowserRouter>
  </React.StrictMode>,
)

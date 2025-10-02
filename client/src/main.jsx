import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routers/Router'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './Context/AuthProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>
  <ToastContainer/>
  <RouterProvider router={router}/>
</AuthProvider>
  </StrictMode>,
)

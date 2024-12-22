import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css"
import { RouterProvider } from 'react-router'
import Router from './routes/Router'
import AuthContext from './context/AuthContext'
import AppContext from './context/AppContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContext>
      <AuthContext>
        <RouterProvider router={Router}/>
      </AuthContext>
    </AppContext>
  </StrictMode>,
)

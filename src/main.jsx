import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css"
import { RouterProvider } from 'react-router'
import Router from './routes/Router'
import AuthContext from './context/AuthContext'
import AppContext from './context/AppContext'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import '@smastrom/react-rating/style.css'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <AuthContext>
          <RouterProvider router={Router}/>
        </AuthContext>
      </AppContext>
    </QueryClientProvider>
  </StrictMode>,
)

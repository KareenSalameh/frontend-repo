import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="632986613914-uhjteviggvm5odspcbeqgc8lh4fi0pdv.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </GoogleOAuthProvider>
)
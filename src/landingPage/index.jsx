import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './landingPage';
import '../index.css'
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RecoilRoot>
        <LandingPage />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>,
)

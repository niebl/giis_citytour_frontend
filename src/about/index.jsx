import React from 'react'
import ReactDOM from 'react-dom/client'
import AboutPage from './aboutPage';
import '../index.css'
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RecoilRoot>
        <AboutPage />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>,
)

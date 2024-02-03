import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { CssBaseline } from "@mui/material";

// theme black
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const shouldApplyStyles = location.pathname.toLowerCase() === '/bein6/register';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <BrowserRouter> 
    {shouldApplyStyles?<ThemeProvider theme={theme}>
      <CssBaseline />
     <App />
    </ThemeProvider>:<App />}
    </BrowserRouter>
  </React.StrictMode>,
)



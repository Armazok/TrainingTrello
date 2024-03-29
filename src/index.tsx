import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import {Provider} from 'react-redux'
import {store} from './app/store'
import {App} from './app/App'
import {HashRouter as Router} from 'react-router-dom'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1e6cd2',
    },
    secondary: {
      main: 'rgba(15,159,236,0.44)',
    },
    error: {
      main: '#d32f2f',
    },
    mode: 'light',
  },
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <Router>
    <CssBaseline />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </Router>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

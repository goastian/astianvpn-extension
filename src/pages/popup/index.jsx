import React from 'react'
import { PageProvider } from 'context/PageContext'
import { ThemeProvider } from 'theme-ui'
import { theme } from 'theme'
import { createRoot } from 'react-dom/client'
import Popup from './Popup'
import 'assets/index.css'

const container = document.getElementById('app-container')
const root = createRoot(container)
root.render(
  <PageProvider>
    <ThemeProvider theme={theme}>
      <Popup />
    </ThemeProvider>
  </PageProvider>
)

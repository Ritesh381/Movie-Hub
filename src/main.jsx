import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MyProvider } from './components/Context/WatchListContext.jsx'
import { MyBotProvider } from './components/Context/BotMessageContext.jsx'

createRoot(document.getElementById('root')).render(
  <MyProvider>
    <MyBotProvider>
    <App />
    </MyBotProvider>
  </MyProvider>,
)

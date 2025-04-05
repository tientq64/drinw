import { createRoot } from 'react-dom/client'
import { App } from './App'
import './helpers/init'
import './style.scss'

const root = createRoot(document.getElementById('root')!)
root.render(<App />)

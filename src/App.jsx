import { useState } from 'react'
import './index.css'
import Header from './components/Header/index'
import Main from '../src/components/Main/index'




function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
      <Main/>
    </div>
  )
}

export default App

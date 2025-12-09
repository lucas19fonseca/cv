import { useState } from 'react'
import './index.css'
import Main from '../src/components/Main/index'




function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     
      <Main/>
    </div>
  )
}

export default App

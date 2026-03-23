import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useEffect } from 'react'



function App() {
const [enabled, setEnabled] = useState(false)
const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('effect', {enabled}) 

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('move', {clientX, clientY})
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled){
      window.addEventListener('pointermove', handleMove)
    }
    return () => {
      window.removeEventListener('pointermove', handleMove)
      }
    }, [enabled])


  return (

    <main>

     <div style={{
    position: 'absolute',
    backgroundColor: 'rgba(29, 26, 211, 0.5)',
    border: '1px solid #fff',
    borderRadius: '50%',
    opacity: 0.8,
    pointerEvents: 'none',
    left: -25,
    top: -25,
    width: 50,
    height: 50,
    transform: `translate(${position.x}px, ${position.y}px)`
  }}
  />

  <button onClick={() => setEnabled(!enabled)}>
  {enabled ? 'Activar ' : 'Desactivar '} 
  Seguir puntero 
  </button>
    </main>

  )
}

export default App

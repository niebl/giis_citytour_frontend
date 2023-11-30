import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Map from './components/map'
import './App.css'
import "leaflet/dist/leaflet.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="h-full w-full">
        <Map>
        </Map>
      </div>
    </>
  )
}

export default App

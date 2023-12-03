import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "leaflet/dist/leaflet.css";

import Map from './components/map'
import UserLocationMarker from './components/mapComponents/UserLocationMarker';
import UserLocationAgent from './components/mapComponents/UserLocationAgent';

const UserLocationContext = createContext({
  userLocationState: null,
  setUserLocationState: () => {}
})

function App() {
  const [count, setCount] = useState(0)

  // {lat: 51.9730, lon: 7.6134} 
  const [ userLocationState, setUserLocationState ] = useState(null)

  return (
    <>
    <UserLocationContext.Provider value={{userLocationState, setUserLocationState}}>
      <div className="h-full w-full">
        <Map>
          <UserLocationAgent />  
        </Map>
      </div>
    </UserLocationContext.Provider>
    </>
  )
}

export default App
export { UserLocationContext }
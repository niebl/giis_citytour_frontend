import { createContext, useState } from 'react'
import './App.css'
import "leaflet/dist/leaflet.css";

import Map from './components/map'
import UserLocationMarker from './components/mapComponents/UserLocationMarker';
import UserLocationAgent from './components/mapComponents/UserLocationAgent';
import HistoricalData from './components/mapComponents/HistoricalData';

const UserLocationContext = createContext({
  userLocationState: null,
  setUserLocationState: () => {}
})

function App() {
  // {lat: 51.9730, lon: 7.6134} 
  const [ userLocationState, setUserLocationState ] = useState(null)

  return (
    <>
    <UserLocationContext.Provider value={{userLocationState, setUserLocationState}}>
      <div className="h-full w-full">
        <Map>
          <UserLocationAgent />
          <HistoricalData />
        </Map>
      </div>
    </UserLocationContext.Provider>
    </>
  )
}

export default App
export { UserLocationContext }
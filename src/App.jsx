import './App.css'
import "leaflet/dist/leaflet.css";

import Map from './components/map'
import UserLocationAgent from './components/mapComponents/UserLocationAgent';
import UserLocationMarker from './components/mapComponents/UserLocationMarker';
import HistoricalData from './components/mapComponents/HistoricalData';


function App() {
  return (
    <>
      <div className="h-full w-full">
        <Map>
          <UserLocationAgent />
          <UserLocationMarker />
          <HistoricalData />
        </Map>
      </div>
    </>
  )
}

export default App
import { createContext, useState } from 'react'
import './App.css'
import "leaflet/dist/leaflet.css";

import Map from './components/map'
import UserLocationAgent from './components/mapComponents/UserLocationAgent';
import UserLocationMarker from './components/mapComponents/UserLocationMarker';
import HistoricalData from './components/mapComponents/HistoricalData';

import { RecoilRoot } from 'recoil';


function App() {
  // {lat: 51.9730, lon: 7.6134} 
  return (
    <>
    <RecoilRoot>
      <div className="h-full w-full">
        <Map>
          <UserLocationAgent />
          <UserLocationMarker />
          <HistoricalData />
        </Map>
      </div>
    </RecoilRoot>
    </>
  )
}

export default App
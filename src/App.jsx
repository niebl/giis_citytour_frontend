import { useState } from 'react'
import './App.css'
import "leaflet/dist/leaflet.css";

import Map from './components/map'
import UserLocationAgent from './components/mapComponents/UserLocation/UserLocationAgent';
import UserLocationMarker from './components/mapComponents/UserLocation/UserLocationMarker';
import HistoricalData from './components/mapComponents/HistoricalData';

import { useRecoilValue, useSetRecoilState  } from "recoil";
import { mapViewState, gameWaypointProgressState } from "./atoms";
import { useEffect } from 'react';
import StoryView from './components/mapComponents/views/StoryView';
import GameProgressAgent from './components/mapComponents/GameProgressAgent';
import { TopNavbar } from './components/navbar/Navbar';
import InfoModal from './components/InfoModal/InfoModal';
import MoreInfoDrawer from './components/mapComponents/MoreInfo/MoreInfoDrawer';

function App() {
  const mapView = useRecoilValue(mapViewState);
  const setMapView = useSetRecoilState(mapViewState);
  const gameProgress = useRecoilValue(gameWaypointProgressState);

  const [ selectedFeature, setSelectedFeature ] = useState(null)

  return (
    <>
      <TopNavbar />
      <InfoModal />
      <div className="h-full">

      
        <h1
          style={{
            backgroundColor: "#00000060",
            zIndex: 1000,
            position: 'absolute',
            left: '50%',
            translate: '-50% 0'
          }}
          className='text-white rounded-full m-2 p-1 px-6'
        >
          {mapView == 'cruising' && "Exploration mode"}
          {mapView == 'story' && "Story mode"}
        </h1>
    

        <Map style={{zIndex: 0}}>
          <UserLocationAgent />
          
          { mapView == 'cruising' &&
          <>
            <UserLocationMarker />
            <HistoricalData setSelectedFeature={setSelectedFeature} />  
          </>
          } 

          { mapView == 'story' &&
          <>
            <GameProgressAgent/>
            <StoryView setSelectedFeature={setSelectedFeature}>
            </StoryView>
          </>
          } 
        </Map>
      </div>
      {selectedFeature && <MoreInfoDrawer selectedFeature={selectedFeature} setSelectedFeature={setSelectedFeature} /> }
    </>
  )
}

export default App
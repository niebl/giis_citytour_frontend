import { useState } from 'react'
import './App.css'
import "leaflet/dist/leaflet.css";

import Map from './components/map'
import UserLocationAgent from './components/mapComponents/UserLocation/UserLocationAgent';
import UserLocationMarker from './components/mapComponents/UserLocation/UserLocationMarker';
import HistoricalData from './components/mapComponents/HistoricalData';

import { useRecoilValue, useSetRecoilState  } from "recoil";
import { mapViewState, gameWaypointProgressState, backendURL, gameLengthState, routingRequestedState } from "./atoms";
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
  const gameLength = useRecoilValue(gameLengthState)
  const routingRequested = useRecoilValue(routingRequestedState)
  const setRoutingRequested = useSetRecoilState(routingRequestedState)

  const [ selectedFeature, setSelectedFeature ] = useState(null)

  const setBackendURL = useSetRecoilState(backendURL)

  useEffect(() => {
    setBackendURL(import.meta.env.VITE_BACKEND_URL)
  })

  function requestRouting(){
    if (!routingRequested){
      setRoutingRequested(true)
    } else {
      setRoutingRequested(false)
    }
  }

  return (
    <>
      <div className="h-full" id="pageWrapper"
        style={{
          display: "flex",
          flexFlow: "column",
          height: "100%"
        }}>
        <TopNavbar />

        <div style={{flex: "1 1 auto"}}>
        
        <div
        style={{
          right: 0,
          display: "flex",
          flexFlow: "row",
          width: "80%",
          position: 'absolute',
          justifyContent: 'right',
        }}>

        <h1
          style={{
            backgroundColor: "#00000060",
            zIndex: 1000,
            //position: 'absolute',
            //left: '50%',
            //translate: '-50% 0'
          }}
          className='text-white rounded-full m-2 p-1 px-6'
        >
          {mapView == 'cruising' && "Exploration mode"}
          {mapView == 'story' && "Story mode"}
        </h1>

        { mapView == 'story' &&
        <h1
          style={{
            backgroundColor: "#f2e2ae",
            zIndex: 2000,
            //position: 'absolute',
            //right: '0%',
            //translate: '-50% 0'
          }}
          className='border-black rounded-full m-2 p-1 px-6 drop-shadow-md hover:drop-shadow-none hover:shadow-inner'
          onClick={()=>{requestRouting()}}
        >        
          {!routingRequested && "I'm lost"}
          {routingRequested && "Hide Navigation"}
        </h1>
        }

        </div>
    
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
            <GameProgressAgent setSelectedFeature={setSelectedFeature} />
            <StoryView setSelectedFeature={setSelectedFeature}>
            </StoryView>
          </>
          } 
        </Map>
        </div>
      </div>

      { mapView == 'story' &&
        <h1
        style={{
          backgroundColor: "#00000060",
          zIndex: 1000,
          position: 'absolute',
          left: '50%',
          translate: '-50% -100px'
        }}
        className='text-white rounded-full m-2 p-1 px-6'
        >
        {gameProgress} / {gameLength} Waypoints visited
        </h1>
      }
      

      {selectedFeature && <MoreInfoDrawer selectedFeature={selectedFeature} setSelectedFeature={setSelectedFeature} /> }
    </>
  )
}

export default App
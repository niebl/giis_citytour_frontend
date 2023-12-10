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

function App() {
  const mapView = useRecoilValue(mapViewState);
  const setMapView = useSetRecoilState(mapViewState);
  const gameProgress = useRecoilValue(gameWaypointProgressState);

  function setViewCruising(state){
    setMapView('cruising')
  }
  function setViewStory(state){
    setMapView('story')
  }

  return (
    <>
      <div className="h-full w-full">
        {
        // the following buttons elements should go into the navigation components
        // could be replaced with a toggle-button too
        // all the other stuff is demontration that the things are working. can be removed later
        }
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
          onClick={setViewCruising}
          >
          cruising mode 
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
          onClick={setViewStory}
          >
          story mode
        </button>
        <h1>{mapView} mode</h1>
        { mapView == 'story' &&
          <h1>waypoints visited {gameProgress}</h1>
        }
        <Map>
          <UserLocationAgent />
          
          { mapView == 'cruising' &&
          <>
            <UserLocationMarker />
            <HistoricalData />  
          </>
          } 

          { mapView == 'story' &&
          <>
            <GameProgressAgent/>
            <StoryView>
            </StoryView>
          </>
          } 

        </Map>
      </div>
    </>
  )
}

export default App
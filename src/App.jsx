import './App.css'
import "leaflet/dist/leaflet.css";

import Map from './components/map'
import UserLocationAgent from './components/mapComponents/UserLocation/UserLocationAgent';
import UserLocationMarker from './components/mapComponents/UserLocation/UserLocationMarker';
import HistoricalData from './components/mapComponents/HistoricalData';

import { useRecoilValue, useSetRecoilState  } from "recoil";
import { mapViewState } from "./atoms";
import { useEffect } from 'react';
import StoryView from './components/mapComponents/views/StoryView';


function App() {
  const mapView = useRecoilValue(mapViewState);
  const setMapView = useSetRecoilState(mapViewState);

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
        
        <Map>
          <UserLocationAgent />
          
          { mapView == 'cruising' &&
          <>
            <UserLocationMarker />
            <HistoricalData />  
          </>
          } 

          { mapView == 'story' &&
            <StoryView>
            </StoryView>
          } 

        </Map>
      </div>
    </>
  )
}

export default App
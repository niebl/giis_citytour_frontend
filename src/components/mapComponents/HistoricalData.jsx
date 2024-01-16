import { useState } from "react"
import { GeoJSON } from "react-leaflet"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRecoilValue } from "recoil";

import icon from '../../assets/historyIcon3.svg'
import templateData from './templateData.json'
import useExternalData from "./useExternalData";
import { selectedStoryState } from "../../atoms";

//const data = templateData

const HistoricalData = ({ setSelectedFeature }) => {
    const story_id = useRecoilValue(selectedStoryState)
    const backendData = useExternalData(story_id)

    if (backendData == undefined){
      return <></>
    }

    const customIcon = L.icon({
        iconUrl: icon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    })

    const onMarkerClick = (e) => {
        const featureProperties = e.target.feature.properties;
        setSelectedFeature(featureProperties)
      }; 

    const showMoreInfo = (featureInfo) => {
        console.log(featureInfo)
    }

    const createMarker = (feature, latlng) => {
        const { name, short_desc } = feature.properties
        const marker = L.marker(latlng, { icon: customIcon }).on('click', onMarkerClick);
        const popupContent = `
            <div class="flex flex-col">
                <b>${name}</b><br />
                ${short_desc} <br />
                <button class="bg-blue-500 text-white py-1 px-2 rounded mt-2 self-end" onclick="showMoreInfo('${feature.properties}')">More Info</button>
            </div>
        `
        marker.bindPopup(popupContent)

        return marker
    }

  return (
    <GeoJSON data={backendData} pointToLayer={createMarker}/>
  )
}

export default HistoricalData
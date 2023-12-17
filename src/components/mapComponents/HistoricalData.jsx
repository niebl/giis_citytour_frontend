import { GeoJSON } from "react-leaflet"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from '../../assets/historyIcon3.svg'
import templateData from './templateData.json'

const data = templateData

const HistoricalData = () => {

    const customIcon = L.icon({
        iconUrl: icon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    })

    const createMarker = (feature, latlng) => {
        const { name, short_desc } = feature.properties
        const marker = L.marker(latlng, { icon: customIcon })
        const popupContent = `
            <div class="flex flex-col">
                <b>${name}</b><br />
                ${short_desc} <br />
                <button class="bg-blue-500 text-white py-1 px-2 rounded mt-2 self-end" onclick="showMoreInfo('${feature.id}')">More Info</button>
            </div>
        `
        marker.bindPopup(popupContent)

        return marker
    }

  return (
    <GeoJSON data={data} pointToLayer={createMarker}/>
  )
}

export default HistoricalData
export {data as TemplateGeoJSON}
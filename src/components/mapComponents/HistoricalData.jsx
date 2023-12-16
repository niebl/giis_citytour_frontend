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

    // const onEachFeature = (feature, layer) => {
    //     const {name, shortDesc} = feature.properties

    //     const marker = L.marker(layer._latlng, { icon: customIcon })
    //     marker.bindPopup(`<b>${name}</b><br />${shortDesc}`);
    //     marker.addTo(layer._map);
    // }

    const createMarker = (feature, latlng) => {
        const { name, short_desc } = feature.properties
        const marker = L.marker(latlng, { icon: customIcon })
        marker.bindPopup(`<b>${name}</b><br />${short_desc}`)

        return marker
    }

  return (
    <GeoJSON data={data} pointToLayer={createMarker}/>
  )
}

export default HistoricalData
export {data as TemplateGeoJSON}
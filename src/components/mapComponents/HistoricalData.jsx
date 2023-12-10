import { GeoJSON } from "react-leaflet"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from '../../assets/historyIcon3.svg'

const data = {
    "type": "FeatureCollection",
    "features": [
    {
        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [7.62584, 51.9631]
        },
        "properties": {
            "name": "Münster Cathedral",
            "image": "image-link",
            "shortDesc": "The current Cathedral of the city of Münster was build between the years 1225 and 1264, after the two prior Cathedrals of the city had fallen into disrepair. Most notably the second Cathedral was demolished to build Paulus-Dom we know today. It is known for its mostly Gothic and Romanesque architecture and the fine sandstone work. As a Cathedral it also is the heart of the diocese of Münster, which encompasses a good chunck of the most northern part of NRW.",
            "longDesc": "text-link",
            "order": "1"
        }
    },
    {
        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [7.62819, 51.9616]
        },
        "properties": {
            "name": "Historical Town Hall",
            "image": "image-link",
            "shortDesc": "It is not quite known when exactly the Historical City Hall of the city of Münster was constructed, but it is known that it happened between 1170 and 1200. Though the original building was a timber building which got added on over the time. While this old City Hall is mostly used for ceremonial purposes today, it played a big role not only in the history of Münster, but also the history of Westfalia, as it was the location on which the Peace of Westphalia was negotiated in 1648.",
            "longDesc": "text-link",
            "order": "2"
        }
    }
    ]
}

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
        const { name, shortDesc } = feature.properties
        const marker = L.marker(latlng, { icon: customIcon })
        marker.bindPopup(`<b>${name}</b><br />${shortDesc}`)

        return marker
    }

  return (
    <GeoJSON data={data} pointToLayer={createMarker}/>
  )
}

export default HistoricalData
export {data as TemplateGeoJSON}
import { useEffect } from "react"
import { TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useRecoilValue } from "recoil";

import icon from '../../assets/historyIcon3.svg'
import useExternalData from "./useExternalData";
import { selectedStoryState } from "../../atoms";

//const data = templateData

const HistoricalData = ({ setSelectedFeature }) => {
    const map = useMap()
    const story_id = useRecoilValue(selectedStoryState)
    const backendData = useExternalData(story_id)

    if (backendData == undefined || backendData.features == undefined) {
      return <></>
    }

    const customIcon = L.icon({
        iconUrl: icon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    })

    const showMoreInfo = (featureInfo) => {
      console.log(featureInfo)
      setSelectedFeature(featureInfo)
    }

    useEffect(() => {
      const markers = L.markerClusterGroup({
        disableClusteringAtZoom: 21
      })

      backendData?.features.forEach((feature, index) => {
        const marker = L.marker([
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        ], { icon: customIcon })

        marker.on('click', () => {
          setSelectedFeature(feature.properties)
        })

        const popupContent = `
            <div class="flex flex-col">
                <b>${feature.properties.name}</b><br />
                ${feature.properties.short_desc} <br />
                <button class="bg-blue-500 text-white py-1 px-2 rounded mt-2 self-end" onclick="showMoreInfo('${feature.properties}')">More Info</button>
            </div>
        `;

        marker.bindPopup(popupContent);

        markers.addLayer(marker);

      })

      map.addLayer(markers)

      return () => {
        // remove markers from map when user switches to story mode
        markers.remove()
      }

    }, [backendData, map])

  return null;
}

export default HistoricalData
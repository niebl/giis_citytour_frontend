import { useEffect } from "react";
import { FeatureGroup, GeoJSON, Marker, Pane, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
 import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { useRecoilValue } from "recoil";

import icon from '../../assets/historyIcon3.svg'
import useExternalData from "./useExternalData";
import { selectedStoryState } from "../../atoms";

//const data = templateData

const HistoricalData = ({ setSelectedFeature }) => {
    //const map = useMap()
    const story_id = useRecoilValue(selectedStoryState)
    const backendData = useExternalData("all")

    if (backendData == undefined || backendData.features == undefined) {
      return <></>
    }

    const customIcon = L.icon({
        iconUrl: icon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    })


/*     const markers = []
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
      markers.append(marker);
    }) */

    const siteMarker = (feature, latlng) => {
      const {name, short_desc, long_desc } = feature.properties
      const marker = L.marker(latlng, {
        icon: customIcon
      }).on('click', () => {
        setSelectedFeature(feature.properties)
      });
      marker.bindPopup(`<b>${name}</b><br />${long_desc}`)
      return marker
    }

    return(
      <Pane name="sites" style={{ zIndex: 200 }}>
        <MarkerClusterGroup>
          {backendData.features.map((waypoint, index) => {
            return (<GeoJSON 
              data={waypoint}
              key={"wpI_"+index+Date.now()}
              pointToLayer={siteMarker}
            />)
            })
          }
        </MarkerClusterGroup>
      </Pane>
    )


  return null;
}

export default HistoricalData
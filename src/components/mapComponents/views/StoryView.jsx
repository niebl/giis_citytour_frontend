import { FeatureGroup, GeoJSON, Pane } from 'react-leaflet';
import L from 'leaflet';
import { TemplateGeoJSON as tourData } from "../HistoricalData";

import icon from '../../../assets/historyIcon3.svg'
import UserLocationMarker from '../UserLocation/UserLocationMarker';


const StoryView = () => {

    if (tourData == undefined || tourData.features == undefined){
        return <></>
    }

    const waypoints = tourData.features
    const buildingIcon = L.icon({
        iconUrl: icon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    })
    const waypointMarker = (feature, latlng) => {
        const { name, shortDesc } = feature.properties
        const marker = L.marker(latlng, { icon: buildingIcon })
        marker.bindPopup(`<b>${name}</b><br />${shortDesc}`)
        return marker
    }


    return (
        <>
        <Pane name="waypoints" style={{ zIndex: 100 }}>
            <FeatureGroup>
                <GeoJSON
                    data={waypoints}
                    key={'waypoints'}
                    pointToLayer={waypointMarker}
                    //onEachFeature={}
                    //style={}
                />
            </FeatureGroup>
        </Pane>
        <Pane name="userLocation" style={{ zIndex: 200 }}>
            <UserLocationMarker />
        </Pane>
        </>
    )
}

export default StoryView
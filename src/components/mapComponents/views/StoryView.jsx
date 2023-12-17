/* eslint-disable react/prop-types */
import { FeatureGroup, GeoJSON, Marker, Pane, Popup } from 'react-leaflet';
import L from 'leaflet';
import { TemplateGeoJSON as tourData } from "../HistoricalData";
import { useRecoilValue, useSetRecoilState  } from "recoil";

import icon from '../../../assets/historyIcon3.svg'
import iconRed from '../../../assets/historyIcon3_red.svg'
import UserLocationMarker from '../UserLocation/UserLocationMarker';

import { 
    userLocationState, 
    gameWaypointProgressState as waypointProgessState 
} from '../../../atoms';

const buildingIcon = L.icon({
    iconUrl: icon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
})
const buildingIconActive = L.icon({
    iconUrl: iconRed,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: 'blinking-marker'
})

const MarkerVisited = (props)=>{
    const feature = props.feature
    console.log(f)
    const key = props.key || ""
    const { name, short_desc, story_desc } = feature.properties
    const coords = feature.geometry.coordinates
    return (
        <Marker icon={buildingIcon} position={[coords[1], coords[0]]} key={key}>
            <Popup>
                <b>${name}</b><br />${short_desc}
            </Popup>
        </Marker>
    )
}

const StoryView = () => {
    //TODO: implement a system that updates player progress
    const waypointProgress = useRecoilValue(waypointProgessState);

    if (tourData == undefined || tourData.features == undefined){
        return <></>
    }

    const waypoints = []
    const waypointsInactive = []

    const waypointMarker = (feature, latlng) => {
        const { name, short_desc, story_desc } = feature.properties
        const marker = L.marker(latlng, { icon: buildingIcon })
        marker.bindPopup(`<b>${name}</b><br />${short_desc}`)
        return marker
    }
    const waypointMarkerInactive = (feature, latlng) => {
        const marker = L.marker(latlng, { icon: buildingIcon, opacity: 0.4 })
        return marker
    }
    const waypointMarkerToVisit = (feature, latlng) => {
        const { name, short_desc, story_desc } = feature.properties
        const marker = L.marker(latlng, { 
            icon: buildingIconActive
            }
        )
        marker.bindPopup(`<b>${name}</b><br />${story_desc}`)
        return marker
    }

    for (let waypoint of tourData.features){
        if (waypoint.properties.order <= waypointProgress){
            waypoints.push(waypoint)
        } else {
            waypointsInactive.push(waypoint)
        }
    }

    return (
        <>
        <Pane name="waypoints" style={{ zIndex: 300 }}>
            <FeatureGroup>
            {tourData.features.map((waypoint, index) => {
                if(waypoint.properties.site_index < waypointProgress+1){
                    return (
                        <GeoJSON
                            data={waypoint}
                            key={"wp_"+index}
                            pointToLayer={waypointMarker}
                            //onEachFeature={}
                            //style={}
                        />
                    )
                }
            })
            }
            </FeatureGroup>
        </Pane>

        <Pane name="waypointActive" style={{ zIndex: 200 }}>
            <FeatureGroup>
            {tourData.features.map((waypoint, index) => {
                if(waypoint.properties.site_index == waypointProgress+1){
                    return (
                        <GeoJSON
                            data={waypoint}
                            key={"active_Waypoint"}
                            pointToLayer={waypointMarkerToVisit}
                            //onEachFeature={}
                            //style={}
                        />
                    )
                }
            })
            }
            </FeatureGroup>
        </Pane>

        <Pane name="waypointsInactive" style={{ zIndex: 100 }}>
        <FeatureGroup>
            {tourData.features.map((waypoint, index) => {
                if(waypoint.properties.site_index > waypointProgress+1){                    
                    return (               
                        <GeoJSON
                            data={waypoint  }
                            key={"wpI_"+index}
                            pointToLayer={waypointMarkerInactive}
                            //onEachFeature={}
                            //style={}
                        />
                    )
                }
            })
            }
            </FeatureGroup>
        </Pane>

        <Pane name="userLocation" style={{ zIndex: 200 }}>
            <UserLocationMarker />
        </Pane>

        </>
    )
}

export default StoryView
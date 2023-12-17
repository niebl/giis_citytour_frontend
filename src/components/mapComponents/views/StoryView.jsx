import { FeatureGroup, GeoJSON, Pane } from 'react-leaflet';
import L from 'leaflet';
import { TemplateGeoJSON as tourData } from "../HistoricalData";
import { useRecoilValue, useSetRecoilState  } from "recoil";

import icon from '../../../assets/historyIcon3.svg'
import UserLocationMarker from '../UserLocation/UserLocationMarker';

import { 
    userLocationState, 
    gameWaypointProgressState as waypointProgessState 
} from '../../../atoms';

const StoryView = () => {
    //TODO: implement a system that updates player progress
    const waypointProgress = useRecoilValue(waypointProgessState);

    if (tourData == undefined || tourData.features == undefined){
        return <></>
    }

    const waypoints = []
    const waypointsInactive = []
    const buildingIcon = L.icon({
        iconUrl: icon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    })
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

    for (let waypoint of tourData.features){
        if (waypoint.properties.order <= waypointProgress){
            waypoints.push(waypoint)
        } else {
            waypointsInactive.push(waypoint)
        }
    }

    return (
        <>
        <Pane name="waypoints" style={{ zIndex: 200 }}>
            <FeatureGroup>
            {tourData.features.map((waypoint) => {
                if(waypoint.properties.site_index <= waypointProgress){
                    console.log("one over")
                    return (
                        <GeoJSON
                            data={waypoint}
                            key={'waypoint'}
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

        <Pane name="waypointsInactive" style={{ zIndex: 100 }}>
        <FeatureGroup>
            {tourData.features.map((waypoint) => {
                if(waypoint.properties.site_index > waypointProgress){
                    console.log("one under")
                    return (               
                        <GeoJSON
                            data={waypoint}
                            key={'waypoint'}
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
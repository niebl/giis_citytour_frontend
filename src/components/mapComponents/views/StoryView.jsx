/* eslint-disable react/prop-types */
import { FeatureGroup, GeoJSON, Marker, Pane, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useRecoilValue, useSetRecoilState  } from "recoil";

import icon from '../../../assets/historyIcon3.svg'
import iconRed from '../../../assets/historyIcon3_red.svg'
import UserLocationMarker from '../UserLocation/UserLocationMarker';
import useExternalData from '../useExternalData';
import SitesRouting from '../routing/SitesRouting';

import { 
    gameLengthState,
    routingRequestedState,
    selectedStoryState,
    userLocationState, 
    gameWaypointProgressState as waypointProgessState,
} from '../../../atoms';
import { useEffect } from 'react';

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

const StoryView = ({ setSelectedFeature}) => {
    const story_id = useRecoilValue(selectedStoryState);
    const tourData = useExternalData(story_id)
    const waypointProgress = useRecoilValue(waypointProgessState);
    const setWaypointProgress = useSetRecoilState(waypointProgessState)
    const setGameLength = useSetRecoilState(gameLengthState)
    const routingRequested = useRecoilValue(routingRequestedState)
    

    

    if (tourData == undefined || tourData.features == undefined) {
        return <>
            <UserLocationMarker />
        </>
    }

    setGameLength(tourData.features.length)

    const onMarkerClick = (e) => {
        console.log(e.target)
        const featureProperties = e.target.feature.properties;
        setSelectedFeature(featureProperties)
      }; 

    const showMoreInfo = (featureInfo) => {
        console.log(featureInfo)
    }

    const waypointMarker = (feature, latlng) => {
        const { name, short_story, long_story } = feature.properties
        const marker = L.marker(latlng, { icon: buildingIcon }).on('click', onMarkerClick);
        marker.bindPopup(`<b>${name}</b><br />${short_story}`)
        return marker
    }
    const waypointMarkerInactive = (feature, latlng) => {
        const marker = L.marker(latlng, { icon: buildingIcon, opacity: 0 })
        return marker
    }
    const waypointMarkerToVisit = (feature, latlng) => {
        const { name, short_story, long_story } = feature.properties
        const marker = L.marker(latlng, { 
            icon: buildingIconActive
            }
        )
        marker.bindPopup(`<b>${name}</b><br />${short_story}`)
        return marker
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
                            key={"wp_"+index+Date.now()}
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
                        <>
                        <GeoJSON
                            data={waypoint}
                            key={"active_Waypoint"+index+Date.now()}
                            pointToLayer={waypointMarkerToVisit}
                            //onEachFeature={}
                            //style={}
                        />
                        <Circle 
                            center={[
                                waypoint.geometry.coordinates[1],
                                waypoint.geometry.coordinates[0]
                            ]}
                            radius={waypoint.properties.radius}
                            key={"active_radius"+index+Date.now()}
                            opacity={0.6}
                            fillOpacity={0.1}
                            color='#ab000e'
                        />
                        </>
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
                            key={"wpI_"+index+Date.now()}
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

        { routingRequested &&
        <Pane name="route" style={{ zIndex: 90 }}>
            <SitesRouting />
        </Pane>
        }
        </>
    )
}

export default StoryView
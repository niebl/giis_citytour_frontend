import { useEffect, useContext } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useGeolocated } from "react-geolocated";
import {point} from '@turf/helpers'
import distance from '@turf/distance'

import useExternalData from "./useExternalData";

import { 
    routingRequestedState,
    selectedStoryState,
    userLocationState, 
    gameWaypointProgressState as waypointProgessState 
} from '../../atoms';

function flip(coords){
    return [coords[1], coords[0]]
}

export default function GameProgressAgent({setSelectedFeature}){
    const story_id = useRecoilValue(selectedStoryState)
    const tourData = useExternalData(story_id)
    
    const userLocation = useRecoilValue(userLocationState)
    const waypointProgress = useRecoilValue(waypointProgessState);
    const setWaypointProgress = useSetRecoilState(waypointProgessState)
    const setRoutingRequested = useSetRecoilState(routingRequestedState)
   
    const stored_progress = window.sessionStorage.getItem(`progress_${story_id}`)

    //load current progress from session-storage
    useEffect(() => {
        if (stored_progress){
            setWaypointProgress(
                parseInt(window.sessionStorage.getItem(`progress_${story_id}`))
            )
        } else if(stored_progress == null){
            window.sessionStorage.setItem(`progress_${story_id}`, 0)
        }
    }, [story_id, stored_progress])

    useEffect(()=>{

        if(!(tourData == undefined || tourData.features == undefined)){
            const waypoints = tourData.features
            for (let waypoint of waypoints){
                //check if player sufficiently close enough to the active waypoint
                if(waypoint.properties.site_index == waypointProgress+1){
                    const radius = waypoint.properties.radius || 50
                    if(distance(
                        waypoint.geometry.coordinates, flip(userLocation),
                        {units: 'meters'}
                        ) <= radius ){
                        window.sessionStorage.setItem(`progress_${story_id}`, waypointProgress)
                        setWaypointProgress(waypointProgress+1)
                        setRoutingRequested(false)

                        setSelectedFeature(waypoint.properties)                        
                    }
                }
            }
        }
    }, [userLocation])

    return(
        <></>
    )
}
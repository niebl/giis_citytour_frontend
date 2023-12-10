import { useEffect, useContext } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useGeolocated } from "react-geolocated";
import {point} from '@turf/helpers'
import distance from '@turf/distance'

import { TemplateGeoJSON as tourData } from "./HistoricalData";

import { 
    userLocationState, 
    gameWaypointProgressState as waypointProgessState 
} from '../../atoms';

function flip(coords){
    return [coords[1], coords[0]]
}

export default function GameProgressAgent(){
    const userLocation = useRecoilValue(userLocationState)
    const waypointProgress = useRecoilValue(waypointProgessState);
    const setWaypointProgress = useSetRecoilState(waypointProgessState)

    useEffect(()=>{
        if(!(tourData == undefined || tourData.features == undefined)){
            const waypoints = tourData.features
            for (let waypoint of waypoints){
                //check if player sufficiently close enough to the active waypoint
                if(waypoint.properties.order == waypointProgress+1){
                    if(distance(
                        waypoint.geometry.coordinates, flip(userLocation),
                        {units: 'meters'}
                        ) <= 200 ){
                        setWaypointProgress(waypointProgress+1)
                    }
                }
            }
        }
    }, [userLocation])

    return(
        <></>
    )
}
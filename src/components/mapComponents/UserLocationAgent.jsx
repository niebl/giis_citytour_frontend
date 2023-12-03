import { useEffect, useContext } from "react";
import { UserLocationContext } from "../../App";
import { useGeolocated } from "react-geolocated";
import UserLocationMarker from "./UserLocationMarker";

//useful reference for desired coordinate precision: https://xkcd.com/2170/
function equalWithinPrecision(number1, number2, decimals=5){
    number1 = number1.toFixed(decimals)
    number2 = number2.toFixed(decimals)
    return(number1 == number2)
}

export default function UserLocationAgent(children){
    const { userLocationState, setUserLocationState } = useContext(UserLocationContext)
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
    });

    if( !isGeolocationAvailable ){
        setUserLocationState(null)
    } else if (!isGeolocationEnabled){
        setUserLocationState(null)
    } else if (coords) {
        const coordinates = [coords.latitude, coords.longitude]
        if( userLocationState === null){
            setUserLocationState(coordinates)
        } else if( 
            !equalWithinPrecision(userLocationState[0], coordinates[0]) && 
            !equalWithinPrecision(userLocationState[1], coordinates[1])
        ){
            setUserLocationState(coordinates)
        }
    }

    return(
        <UserLocationMarker />
    )
}
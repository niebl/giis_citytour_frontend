import { useEffect, useContext } from "react";
import { userLocationState } from "../../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useGeolocated } from "react-geolocated";
import UserLocationMarker from "./UserLocationMarker";

//useful reference for desired coordinate precision: https://xkcd.com/2170/
function equalWithinPrecision(number1, number2, decimals=5){
    number1 = number1.toFixed(decimals)
    number2 = number2.toFixed(decimals)
    return(number1 == number2)
}

export default function UserLocationAgent(children){
    const userLocation = useRecoilValue(userLocationState)
    const setUserLocation = useSetRecoilState(userLocationState)
    console.log(userLocation)
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
    });

    useEffect(() => {
        if( !isGeolocationAvailable ){
            setUserLocation(null)
        } else if (!isGeolocationEnabled){
            setUserLocation(null)
        } else if (coords) {
            const coordinates = [coords.latitude, coords.longitude]
            if( userLocation === null || userLocation[0] === null){
                setUserLocation(coordinates)
            } else if( 
                !equalWithinPrecision(userLocation[0], coordinates[0]) && 
                !equalWithinPrecision(userLocation[1], coordinates[1])
            ){
                setUserLocation(coordinates)
            }
        }
    })
    

    return(
        <></>
    )
}
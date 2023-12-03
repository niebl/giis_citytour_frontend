import { useEffect, useContext } from "react";
import { UserLocationContext } from "../../App";
import { useGeolocated } from "react-geolocated";
import UserLocationMarker from "./UserLocationMarker";

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
        setUserLocationState([coords.latitude, coords.longitude])
    }

    return(
        <UserLocationMarker />
    )
}
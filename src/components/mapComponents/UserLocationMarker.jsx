import { Popup, Marker } from "react-leaflet"
import L from 'leaflet';
import { createContext, useContext, useEffect } from 'react';
import { UserLocationContext } from "../../App";

import iconUserLocation from "./iconUserLocation";

function UserLocationMarker(){
    const { userLocationState, setUserLocationState } = useContext(UserLocationContext)

    if (userLocationState == null){
        return <></>
    }

    return(
        <Marker position={userLocationState} icon={iconUserLocation}>
        <Popup>
            user location
        </Popup>
        </Marker>
    )
}

export default UserLocationMarker
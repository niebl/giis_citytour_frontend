import { Popup, Marker } from "react-leaflet"
import L from 'leaflet';
import { createContext, useContext, useEffect } from 'react';
import { useRecoilValue } from "recoil";

import { userLocationState } from "../../atoms";

import iconUserLocation from "./iconUserLocation";

function UserLocationMarker(){
    const userLocation = useRecoilValue(userLocationState)

    if (userLocation[0] == null){
        return <></>
    }

    return(
        <Marker position={userLocation} icon={iconUserLocation}>
        <Popup>
            user location
        </Popup>
        </Marker>
    )
}

export default UserLocationMarker
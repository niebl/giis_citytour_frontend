import { Popup, Marker } from "react-leaflet"
import { createContext, useContext, useEffect } from 'react';
import { UserLocationContext } from "../../App";

function UserLocationMarker(){
    const { userLocationState, setUserLocationState } = useContext(UserLocationContext)

    if (userLocationState == null){
        return <></>
    }

    return(
        <Marker position={userLocationState}>
        <Popup>
            user location
        </Popup>
        </Marker>
    )
}

export default UserLocationMarker
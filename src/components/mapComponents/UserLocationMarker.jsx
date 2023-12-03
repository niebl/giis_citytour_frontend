import { Popup, Marker } from "react-leaflet"
import { createContext, useContext } from 'react';
import { UserLocationContext } from "../../App";

function UserLocationMarker(){
    const { userLocationState, setUserLocationState } = useContext(UserLocationContext)
    console.log(userLocationState)

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
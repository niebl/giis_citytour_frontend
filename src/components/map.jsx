import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet"

export default function Map({children}){
    const position = [51.955, 7.62]
        
    return(
        <MapContainer 
            center={position} 
            zoom={13} 
            scrollWheelZoom={true} 
            style={{
                height: "100%", minHeight: "100%" 
            }}>

            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {children}
        </MapContainer>
    )
}
import { useEffect, memo } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

const SitesRouting = memo(() => {
    const map = useMap()

    useEffect(() => {
        const route = L.Routing.control({
            waypoints: [
                L.latLng(57.74, 11.94),
                L.latLng(57.6792, 11.949)
            ]
        })

        route.addTo(map)

        return () => {
            // remove route control when component is unmounted
            route.remove()
        }

    }, [])

    return null;
})

SitesRouting.displayName = 'SitesRouting';

export default SitesRouting
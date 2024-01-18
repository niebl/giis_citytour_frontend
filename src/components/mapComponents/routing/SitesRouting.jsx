import { useEffect, useCallback, memo } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import { userLocationState, gameWaypointProgressState,selectedStoryState } from '../../../atoms';
import useExternalData from '../useExternalData';
import { useRecoilValue } from "recoil";

const SitesRouting = memo(() => {
    const map = useMap()
    const story_id = useRecoilValue(selectedStoryState)
    const tourData = useExternalData(story_id)
    const userLocation = useRecoilValue(userLocationState)
    const waypointProgress = useRecoilValue(gameWaypointProgressState)

    const getActiveSite = useCallback(() => {
        return tourData?.features?.find((element) => {
          return element.properties.site_index === waypointProgress + 1;
        });
    }, [tourData, waypointProgress]);

    useEffect(() => {
        const activeSite = getActiveSite();

        if (activeSite) {
            const activeSiteCoordinates = activeSite.geometry?.coordinates;
            const route = L.Routing.control({
              waypoints: [
                L.latLng(userLocation[0], userLocation[1]),
                L.latLng(activeSiteCoordinates[1], activeSiteCoordinates[0]),
              ],
            });
      
            route.addTo(map);
      
            return () => {
              route.remove();
            };
          }

    }, [map, userLocation, getActiveSite])

    return null;
})

SitesRouting.displayName = 'SitesRouting';

export default SitesRouting
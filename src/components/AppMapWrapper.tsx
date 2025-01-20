import { useStore } from "@/hooks/useStore";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { customMarkerIcon } from "@/utils/customMapMarker";

const AppMap = () => {
  const { state } = useStore();
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (state.selectedUser && state.showLocation) {
      const coords = state.selectedUser.address.coordinates;

      if (markerRef.current) {
        map.removeLayer(markerRef.current);
        markerRef.current = null;
      }

      const newMarker = L.marker(coords, { icon: customMarkerIcon })
        .addTo(map)
        .openPopup();

      markerRef.current = newMarker;

      map.flyTo(coords, 12, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [state, map]);

  return null;
};

const AppMapWrapper = () => {
  return (
    <MapContainer
      className="w-full max-w-full"
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <AppMap />
    </MapContainer>
  );
};

export default AppMapWrapper;

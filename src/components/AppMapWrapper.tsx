import { useStore } from "@/hooks/useStore";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

const AppMap = () => {
  const { state } = useStore();
  const map = useMap();

  useEffect(() => {
    if (state.selectedUser && state.showLocation) {
      const coords = state.selectedUser.address.coordinates;

      map.flyTo(coords, 12, {
        duration: 1.5,
        easeLinearity: 0.25,
      });

      L.marker(coords).addTo(map).openPopup();
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

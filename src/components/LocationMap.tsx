import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/hooks/useStore";
import { Address } from "@/types/types";
import { customMarkerIcon } from "@/utils/customMapMarker";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

// Utility to fetch the address based on the coordinates
const fetchAddress = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const LocationMap = () => {
  const { state, dispatch } = useStore();
  const [position, setPosition] = useState(
    state.newAddress?.coordinates || state.selectedUser?.address?.coordinates
  );
  const { toast } = useToast();

  // Map event handler for selecting a location
  function LocationMarker() {
    const map = useMapEvents({
      async click(event) {
        const { lat, lng } = event.latlng;
        setPosition([lat, lng]);
        map.flyTo([lat, lng], map.getZoom());

        try {
          const data = await fetchAddress(lat, lng);
          const address = data?.address;
          const newAddress = {
            street: address?.road || "",
            city: address?.city || address?.town || "",
            state: address?.state || "",
            postalCode: address?.postcode || "",
            country: address?.country || "",
            coordinates: [lat, lng],
          };

          dispatch({
            type: "SET_NEW_ADDRESS",
            payload: newAddress as Address,
          });
        } catch (error) {
          const errorMessage =
            (error as { message?: string })?.message || "Something went Wrong.";
          toast({
            variant: "destructive",
            title: errorMessage || "Something went wrong!",
            description: "Please try after sometime.",
            className: "z-[2000]",
          });
          console.error(error);
        }
      },
    });

    return position ? (
      <Marker icon={customMarkerIcon} position={position as [number, number]}>
        <Popup>
          {state.selectedUser?.address?.country &&
          state.selectedUser?.address?.city &&
          state.selectedUser?.address?.postalCode
            ? `${state.selectedUser.address.country}, ${state.selectedUser.address.city}, ${state.selectedUser.address.postalCode}`
            : "Selected location"}
        </Popup>
      </Marker>
    ) : null;
  }

  return (
    <MapContainer
      className="w-full max-w-full"
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};

export default LocationMap;

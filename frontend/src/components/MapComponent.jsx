import React from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { Container } from "react-bootstrap";

function MapComponent() {
  const position = { lat: 43.8563, lng: 18.4131 };
  
  return (
    <Container style={{ height: "50vh", width: "100%" }} className="mx-0 mb-4">
      <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map center={position} zoom={9}></Map>
      </APIProvider>
    </Container>
  );
}

export default MapComponent;

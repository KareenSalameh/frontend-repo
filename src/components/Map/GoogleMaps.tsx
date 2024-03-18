import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const GoogleMaps: React.FC = () => {
  // Replace 'YOUR_API_KEY' with your actual Google Maps API key
  const apiKey = 'AIzaSyB6PHIIXJR7g0tPqyh7UFAu6D7Upe-9Ezc';

  // Define the map container style
  const containerStyle = {
    width: '1100px',
    height: '700px',
  };

  // Define the center coordinates for the map
  const center = {
    lat: -34.397,
    lng: 150.644,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
      ></GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;

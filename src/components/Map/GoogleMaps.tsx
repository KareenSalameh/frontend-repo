import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

interface GoogleMapsProps {
  latitude: number;
  longitude: number;
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ latitude, longitude }) => {
  const apiKey = 'AIzaSyAc15uVFtPpV0T8gBJIJm8gmMnfiSg3alA';

  const containerStyle = {
    width: '100%', // Adjust width as needed
    height: '400px', // Adjust height as needed
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12} // Adjust zoom level as needed
      />
    </LoadScript>
  );
};

export default GoogleMaps;


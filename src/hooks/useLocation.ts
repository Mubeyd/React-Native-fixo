import {useState} from 'react';
import {Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export async function useLocation(): Promise<[Number, Number]> {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.034411,
    longitude: 37.319067,
  });

  // setTimeout func.

  if (1) {
    // check if location is enabled
    // get location
  } else {
    // ask to enable location
  }
  
  Geolocation.getCurrentPosition(
    (position) => {
      const initialPosition = JSON.stringify(position);
      setCurrentLocation({
        ...currentLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      console.log('initialPosition :>> ', initialPosition);
    },
    (error) => Alert.alert('Error', JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  );

  return [currentLocation.latitude, currentLocation.longitude];
}

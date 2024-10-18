import React, { useEffect, useState, Alert } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Permission Denied', 'Location permission is required to display your position on the map.');
        return;
      }

      // Fetch the current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <MapView style={styles.map} />
        alert.alert("Loading...", "Fetching your location");
        {/* <Alert.alert("Loading...", "Fetching your location"); */}
      </View>
    ); // Placeholder while location is being fetched
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude, // User's current latitude
          longitude: location.longitude, // User's current longitude
          latitudeDelta: 0.01, // Zoom level
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true} // Show the user's location as a marker
      >
        {/* OpenStreetMap Tile Layer */}
        <UrlTile
          urlTemplate="https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19} // OSM max zoom level is 19
          flipY={false}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Makes the map fill the screen
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Fills the entire screen with the map
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MapScreen;

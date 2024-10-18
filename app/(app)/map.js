import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons'; // Import vector icon pack
import { DeviceMotion } from 'expo-sensors'; // For device orientation

export default function App() {
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(null); // State for the heading
  const [orientation, setOrientation] = useState(0); // State for device orientation
  const [errorMsg, setErrorMsg] = useState(null);
  const [watcher, setWatcher] = useState(null); // To store location watcher

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Start real-time location monitoring
      const locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Update location every 1 second
          distanceInterval: 1, // Update when the user moves by 1 meter
        },
        (newLocation) => {
          setLocation(newLocation.coords); // Update the location state with real-time data
        }
      );

      // Start real-time heading monitoring
      const headingWatcher = await Location.watchHeadingAsync((headingData) => {
        setHeading(headingData.trueHeading); // Update heading (true heading)
      });

      // Start device orientation monitoring
      const orientationListener = DeviceMotion.addListener(({ orientation }) => {
        setOrientation(orientation); // Update device orientation
      });

      // Set watchers to clean them up later
      setWatcher(locationWatcher);

      return () => {
        if (watcher) watcher.remove(); // Clean up location watcher on unmount
        if (headingWatcher) headingWatcher.remove(); // Clean up heading watcher on unmount
        if (orientationListener) orientationListener.remove(); // Clean up orientation listener
      };
    })();
  }, []);

  let text = 'Waiting for location...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // Calculate the adjusted rotation based on heading and device orientation
  const getAdjustedRotation = () => {
    if (heading === null || orientation === null) return 0;
    return (heading + orientation) % 360; // Adjust rotation based on device orientation
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005, // Zoom closer initially
            longitudeDelta: 0.005,
          }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005, // Zoom closer initially
            longitudeDelta: 0.005,
          }}
          showsUserLocation={false} // Disable default user location marker
          loadingEnabled={true}
          zoomEnabled={true} // Enable zooming
          scrollEnabled={true} // Enable scrolling/panning
        >
          <UrlTile
            /**
             * OpenStreetMap Tile URL Template
             * The {z}, {x}, {y} values are replaced by the zoom level and tile indexes.
             * Tile servers: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
             */
            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
            tileSize={256}
          />

          {/* Single navigation arrow marker */}
          {location && heading !== null && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              anchor={{ x: 0.5, y: 0.5 }} // Center the arrow on the marker
              flat={true} // Allows the marker to rotate flat
              rotation={getAdjustedRotation()} // Rotate the marker based on the adjusted heading
              tracksViewChanges={false} // Prevent the marker from re-rendering on each change
              icon={null} // Remove the default marker icon
            >
              {/* Custom arrow using FontAwesome */}
              <FontAwesome
                name="location-arrow"
                size={40}
                color="blue"
                style={{ transform: [{ rotate: `${getAdjustedRotation()}deg` }] }}
              />
            </Marker>
          )}
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <View style={styles.locationBox}>
        <Text style={styles.locationText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationBox: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  locationText: {
    color: 'black',
  },
});
 
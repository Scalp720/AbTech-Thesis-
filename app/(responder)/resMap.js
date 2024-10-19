import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, Animated, Easing, Text } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { AntDesign } from '@expo/vector-icons'; // Import the icon library

export default function ResMap({ showBackButton = true }) {  // Accept showBackButton as a prop with default value true
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Radar animation refs
  const radarScale = useRef(new Animated.Value(0)).current; // Start scale at 0
  const radarOpacity = useRef(new Animated.Value(0.5)).current; // Start opacity at 0.5

  // Get the navigation object
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords); // Set user's current location once
    })();

    // Start the radar animation
    const animateRadar = () => {
      radarScale.setValue(0); // Reset scale
      radarOpacity.setValue(0.5); // Reset opacity

      Animated.loop(
        Animated.parallel([
          Animated.timing(radarScale, {
            toValue: 1.5, // Scale up
            duration: 2000, // 2 seconds for full pulse
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(radarOpacity, {
            toValue: 0, // Fade out opacity
            duration: 2000, // 2 seconds
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateRadar(); // Start the radar animation
  }, []);

  return (
    <View style={styles.container}>
      {/* Custom Back Button */}
      {showBackButton && (  // Conditionally show the back button if showBackButton is true
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      )}

      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={false} // Disable the default blue dot
          loadingEnabled={true}
        >
          <UrlTile
            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            tileSize={256}
          />

          {/* Static Custom Marker with Resized Image */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={"You're here"}
            description={"This is your current location"}
          >
            {/* Radar animation */}
            <View style={styles.markerWrapper}>
              <Animated.View
                style={[
                  styles.radar,
                  {
                    transform: [{ scale: radarScale }],
                    opacity: radarOpacity,
                  },
                ]}
              />
              {/* Custom Image for the Marker with set size */}
              <Image
                source={require('../../assets/images/src/responder_pin.png')} // Ensure the path is correct
                style={{ height: 50, width: 40 }} // Set size to 40x40
              />
            </View>
          </Marker>
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#00000080', // Semi-transparent black background
    borderRadius: 50,
    padding: 10,
  },
  markerWrapper: {
    alignItems: 'center', // Center radar and pin
    justifyContent: 'center',
  },
  radar: {
    position: 'absolute',
    width: 100, // Adjust radar size
    height: 100,
    borderRadius: 50, // Make it a circle
    backgroundColor: 'green', // Light blue color for radar
  },
});

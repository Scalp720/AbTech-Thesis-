import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, TouchableOpacity, Animated } from 'react-native'; // Make sure Animated is imported from 'react-native'
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native'; // For navigation
import { AntDesign } from '@expo/vector-icons'; // Import the icon library
import { db, doc, setDoc } from '../../context/firebaseConfig'; // Firestore imports

export default function App() {
  const [location, setLocation] = useState(null); // State for real-time location
  const [errorMsg, setErrorMsg] = useState(null); // Error message state
  const radarAnimation = useRef(new Animated.Value(0)).current; // Radar animation reference

  const navigation = useNavigation(); // Hook to access navigation
   // Get the current timestamp and convert it to a human-readable format

 

  // Function to upload real-time location data to Firestore
  const updateLocationInFirestore = async (latitude, longitude) => {
    try {
      const now = new Date();
      const formattedTimestamp = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now
        .getDate()
        .toString()
        .padStart(2, '0')} ${now
        .getHours()
        .toString()
        .padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${now
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;
        
      const locationRef = doc(db, 'Users', 'Location-Details');
      await setDoc(locationRef, {
        latitude,
        longitude,
        timestamp: formattedTimestamp,
      }, { merge: true });
    } catch (error) {
      console.error("Error saving location to Firestore:", error);
    }
  };

  useEffect(() => {
    // Start radar pulse animation
    const startRadarAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(radarAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(radarAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startRadarAnimation();

    // Start location tracking
    const startLocationTracking = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          setLocation(newLocation.coords); // Update location state
          updateLocationInFirestore(latitude, longitude); // Save location to Firestore
        }
      );

      return () => {
        if (locationWatcher) locationWatcher.remove(); // Clean up on unmount
      };
    };

    startLocationTracking();
  }, []);

  let displayText = 'Waiting for location...';
  if (errorMsg) {
    displayText = errorMsg;
  } else if (location) {
    displayText = `Lat: ${location.latitude}, Lng: ${location.longitude}`;
  }

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Go back to the previous screen
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={false}
          loadingEnabled={true}
          zoomEnabled={true}
          scrollEnabled={true}
        >
          <UrlTile
            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
            tileSize={256}
          />

          {/* Custom Marker with Radar Animation */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            tracksViewChanges={false}
          >
            {/* Radar animation */}
            <Animated.View
              style={[
                styles.radarContainer,
                {
                  transform: [
                    {
                      scale: radarAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 3], // Scale radar from 0.5x to 3x size
                      }),
                    },
                  ],
                  opacity: radarAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0], // Fade the radar out
                  }),
                },
              ]}
            />

            {/* Pin Point Image */}
            <Image
              source={require('../../assets/images/src/pin-point.png')}
              style={{
                width: 40,
                height: 60,
              }}
            />
          </Marker>
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <View style={styles.locationBox}>
        <Text style={styles.locationText}>{displayText}</Text>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#00000080', // Semi-transparent black background
    borderRadius: 50,
    padding: 10,
  },
  locationBox: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    backgroundColor: '#006E60',
    padding: 10,
    minWidth: '90%',
    borderRadius: 10,
  },
  locationText: {
    color: 'white',
  },
  radarContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(253, 129, 127, 42)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1, // Ensure the radar is behind the pin point
    top: -30, // Center the radar on the pin point
    left: -30, // Center the radar on the pin point
  },
});

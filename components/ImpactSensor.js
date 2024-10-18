import React, { useState, useEffect, useRef } from 'react';
import { Alert, Vibration, TouchableOpacity, Image, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { db } from '../context/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function ImpactSensor({ onImpactDetected }) {
  const [impactDetected, setImpactDetected] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [countdown, setCountdown] = useState(3); // Countdown state (3 seconds)
  const countdownInterval = useRef(null); // To track countdown decrement

  useEffect(() => {
    return () => {
      Accelerometer.removeAllListeners(); // Clean up listeners when the component unmounts
      clearInterval(countdownInterval.current); // Clear any countdown intervals when unmounting
    };
  }, []);

  const startImpactDetection = async () => {
    if (impactDetected) return; // Prevent further detection if already detected

    Vibration.vibrate([0, 500, 500, 500]); // Custom longer vibration pattern when activation starts
    Alert.alert('Accelerometer Activated', 'The accelerometer has been activated.');

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission not granted', 'Location permission is required.');
      return;
    }

    const accelerometerSubscription = Accelerometer.addListener(async ({ x, y, z }) => {
      const impactThreshold = 2; // Adjust based on testing
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      if (acceleration > impactThreshold && !impactDetected) {
        setImpactDetected(true); // Mark impact as detected
        Vibration.vibrate([0, 1000, 1000, 1000]); // Strong vibration for impact detection
        Alert.alert('Impact Detected', 'An impact has been detected.');

        // Store the location and remove the listener
        await getLocationAndStore();
        accelerometerSubscription.remove(); // Stop further detection

        if (onImpactDetected) {
          onImpactDetected();
        }
      }
    });

    Accelerometer.setUpdateInterval(100); // Set the interval for accelerometer updates
  };

  const getLocationAndStore = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
      const formattedAddress = address ?
        `${address.district || ''}, ${address.city || ''}, ${address.region || ''}, ${address.country || ''}` :
        'Address not found';

      // Store the location in the 'needResponse' collection
      await addDoc(collection(db, 'needResponse'), {
        latitude,
        longitude,
        address: formattedAddress,
        timestamp: new Date(),
        status: 'Pending', // Add a status field if needed to track the response status
      });

      Alert.alert('Success', 'Your location has been stored. Please wait for the responder!');
    } catch (error) {
      console.error('Error storing location in Firebase:', error.message);
      Alert.alert('Error', 'Unable to store location in Firebase. Please check your configuration and network.');
    }
  };

  const handlePressIn = () => {
    setIsHolding(true);
    setCountdown(3); // Reset countdown to 3 seconds
    Vibration.vibrate([0, 100, 100]); // Short vibration on press in

    // Start the countdown
    countdownInterval.current = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 1) {
          clearInterval(countdownInterval.current); // Stop countdown at 0
          startImpactDetection(); // Activate accelerometer when countdown ends
          return 0; // Show "Activated!" when countdown ends
        }
        return prevCountdown - 1; // Decrease the countdown by 1 each second
      });
    }, 1000); // Update every second
  };

  const handlePressOut = () => {
    setIsHolding(false);
    clearInterval(countdownInterval.current); // Clear the countdown interval if the button is released early
    setCountdown(3); // Reset countdown if button is released early
  };

  return (
    <View>
      {/* Touchable Image Button with SOS Text */}
      <TouchableOpacity
        onPressIn={handlePressIn} // Start holding
        onPressOut={handlePressOut} // Stop holding
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={require('../assets/images/src/button.png')}
          style={{ width: 300, height: 300 }}
        />
        {/* Overlayed SOS Text */}
        <Text style={{
          position: 'absolute',
          top: '30%',// Positioned absolutely within the TouchableOpacity
          right: '10%', // 10% from the right
          left: '10%',  // 10% from the left
          textAlign: 'center', // Centers the text horizontally within the space
          fontSize: 40,
          fontWeight: 'bold',
          color: 'white',
        }}>
          S.O.S
        </Text>
        {/* Countdown Timer or Hold 3 Seconds */}
        <Text style={{
          position: 'absolute',
          top: '50%', // 50% from the top
          right: '10%', // 10% from the right
          left: '10%',  // 10% from the left
          textAlign: 'center', // Centers the text horizontally within the space
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
        }}>
          {isHolding ? (countdown > 0 ? `${countdown} Seconds` : 'Activated!') : 'Hold 3 Seconds'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

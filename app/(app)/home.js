import React, { useState, useRef } from 'react';
import { View, Image, Vibration, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import router

export default function Home() {
  const [showMap, setShowMap] = useState(false); // State to toggle map visibility
  const router = useRouter(); // Access the router
  const [isHolding, setIsHolding] = useState(false);
  const [countdown, setCountdown] = useState(3); // Countdown state (3 seconds)
  const countdownInterval = useRef(null); // To track countdown decrement

  const handlePressIn = () => {
    setIsHolding(true);
    setCountdown(3); // Reset countdown to 3 seconds
    Vibration.vibrate([0, 100, 100]); // Short vibration on press in

    // Start the countdown
    countdownInterval.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(countdownInterval.current); // Stop countdown at 0
          setIsHolding(false); // Stop holding state

          // Defer the navigation using setTimeout
          setTimeout(() => {
            router.push('/map'); // Navigate after the countdown ends
          }, 0);

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
    <View style={{ flex: 1 }}>
      <StatusBar style='light' />
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ position: 'relative', width: '100%' }}>
            <Image
              style={{ width: '100%' }}
              source={require('../../assets/images/src/headerdesign.png')}
            />
            {/* Icons placed on top of the image with z-index */}
            <View style={{
              position: 'absolute',
              top: 90,
              left: 0,
              right: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 30,
              zIndex: 1
            }}>
              {/* Toggle the MapScreen visibility on press */}
              <TouchableOpacity onPress={() => router.push('/map')}>
                <Feather name='settings' size={30} color='#FFFF' />
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: '#FFFF', padding: 5, borderRadius: 30 }}>
                <AntDesign name='bells' size={30} color='black' />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20%',
            marginHorizontal: '20%'
          }}>
            <View>
              {/* Touchable Image Button with SOS Text */}
              <TouchableOpacity
                onPressIn={handlePressIn} // Start holding
                onPressOut={handlePressOut} // Stop holding
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Image
                  source={require('../../assets/images/src/button.png')}
                  style={{ width: 300, height: 300 }}
                />
                {/* Overlayed SOS Text */}
                <Text
                  style={{
                    position: 'absolute',
                    top: '30%', // Positioned absolutely within the TouchableOpacity
                    right: '10%', // 10% from the right
                    left: '10%', // 10% from the left
                    textAlign: 'center', // Centers the text horizontally within the space
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  S.O.S
                </Text>
                {/* Countdown Timer or Hold 3 Seconds */}
                <Text
                  style={{
                    position: 'absolute',
                    top: '50%', // 50% from the top
                    right: '10%', // 10% from the right
                    left: '10%', // 10% from the left
                    textAlign: 'center', // Centers the text horizontally within the space
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {isHolding ? (countdown > 0 ? `${countdown} Seconds` : 'Activated!') : 'Hold 3 Seconds'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={{
            fontSize: 25,
            fontWeight: '500',
            color: '#295E4E',
            textTransform: 'uppercase',
            marginTop: 20
          }}>Current Location</Text>

          <Text style={{
            fontSize: 16,
            color: '#000',
            marginTop: 10
          }}>Address</Text>
        </View>
      </View>
    </View>
  );
}

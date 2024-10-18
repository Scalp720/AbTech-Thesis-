import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Feather } from '@expo/vector-icons';
import ImpactSensor from '../../components/ImpactSensor';
import MapScreen from '../../components/MapScreen';
import { useRouter } from 'expo-router'; // Impor

export default function Home() {
  const [showMap, setShowMap] = useState(false); // State to toggle map visibility
  const router = useRouter(); // Access the router

  const handleImpactDetected = () => {
    // Handle impact detected event here if needed
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
              <TouchableOpacity  onPress={()=> router.push('/map')}>
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
            <ImpactSensor onImpactDetected={handleImpactDetected} />
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

          {/* Animated View for MapScreen */}
          {showMap && (
            <View style={{ flex: 1, width: '100%', height: '50%' }}>
              <MapScreen /> {/* Display the MapScreen */}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

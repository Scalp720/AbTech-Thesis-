import { View } from 'react-native';
import React, { useEffect } from 'react';
import { Slot, useRouter } from 'expo-router';
import { useAuth, AuthContextProvider } from '../context/authContext';
import { StatusBar } from 'expo-status-bar';
import ImpactSensor from '../components/ImpactSensor';
import MapScreen from '../components/MapScreen';

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return;

    if (isAuthenticated) {
      // Redirect to landing page if authenticated
      console.log("User is authenticated, redirecting to landing page");
      router.push('/landing'); // Navigate to landing page
    } else {
      // Redirect to sign-in page if not authenticated
      console.log("User is not authenticated, redirecting to signIn page");
      router.push('/signIn'); // Navigate to sign-in page
    }
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
};
export default function RootLayout() {
  return (
    <AuthContextProvider>
      <StatusBar style='black' />
      <MainLayout />
    </AuthContextProvider>
  );
}

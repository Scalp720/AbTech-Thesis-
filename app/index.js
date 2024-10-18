import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Simulate a loading screen delay
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay for demonstration purposes
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-between bg-white">
      <View className="flex-1 items-center justify-center pt-16">
        <Image
          source={require('../assets/images/src/logo.png')} // Replace with your logo path
          className="w-36 h-36 object-contain"
        />
        <Text className="text-lg font-bold text-gray-800 mt-5 text-center">
          Quick Solution for Every Situation
        </Text>
      </View>

      <View className="flex-1 items-center justify-center w-full">
        <Image
          source={require('../assets/images/src/design1.png')} // Replace with your background image path
          className="absolute bottom-0 w-full h-72 object-cover"
        />
        <View className="w-full items-center pb-8">
          <TouchableOpacity
            className="w-4/5 p-4 bg-orange-500 rounded-md items-center mb-2"
            onPress={() => router.push('home')}
          >
            <Text className="text-white text-lg font-bold">Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-4/5 p-4 border-2 border-orange-500 rounded-md items-center"
            onPress={() => router.push('signUp')}
          >
            <Text className="text-orange-500 text-base font-bold">
              New to AbTech? Sign up!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

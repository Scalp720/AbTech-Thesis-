import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router'; // Import the useRouter hook

export default function Index() {
  const router = useRouter(); // Initialize the router
  const [isLoginHovered, setIsLoginHovered] = useState(false); // State for login button hover
  const [isSignupHovered, setIsSignupHovered] = useState(false); // State for signup button hover

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/src/logo.png')} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.tagline}>Quick Solution for Every Situation</Text>
      </View>

      <View style={styles.bottomContainer}>
        <Image
          source={require('../assets/images/src/design1.png')} // Replace with your background image path
          style={styles.backgroundImage}
        />
        <View style={styles.buttonContainer}>
          {/* Log In button with hover effect */}
          <Pressable
            style={[
              styles.loginButton,
              { backgroundColor: isLoginHovered ? '#FF8C00' : '#FFA500' } // Change color on hover
            ]}
            onPress={() => router.push('/signIn')}
            onHoverIn={() => setIsLoginHovered(true)}
            onHoverOut={() => setIsLoginHovered(false)}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </Pressable>

          {/* Sign Up button with hover effect */}
          <Pressable
            style={[
              styles.signupButton,
              { borderColor: isSignupHovered ? '#FF8C00' : '#FFA500' } // Change border color on hover
            ]}
            onPress={() => router.push('/signUp')}
            onHoverIn={() => setIsSignupHovered(true)}
            onHoverOut={() => setIsSignupHovered(false)}
          >
            <Text
              style={[
                styles.signupButtonText,
                { color: isSignupHovered ? '#FF8C00' : '#FFF' } // Change text color on hover
              ]}
            >
              New to AbTech? Sign up!
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  tagline: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 300,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: 300,
    position: 'absolute',
    resizeMode: 'cover',
    bottom: 0,
    objectFit: 'cover',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  loginButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#FFA500',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    borderWidth: 2,
    borderColor: '#FFA500',
    borderRadius: 8,
    width: '80%',
    padding: 15,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

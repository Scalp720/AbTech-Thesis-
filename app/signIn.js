import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import Home from './(app)/home';

export default function SignIn() {
  const [activeTab, setActiveTab] = useState('User'); // State for active tab
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  return (
    <View style={styles.container}>
      {/* StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="#FFFF" translucent={false} />

      <Image
        source={require('../assets/images/src/loginbg.png')} // Ensure this path is correct
        style={styles.backgroundImage}
      />

      {/* Toggle Buttons */}
      <View style={[styles.toggleButtonsContainer, styles.backgroundtoggle]}>
        <Pressable
          onPress={() => setActiveTab('User')}
          style={[
            styles.toggleButton,
            styles.leftToggleButton,
            activeTab === 'User' ? styles.activeToggleButton : styles.inactiveToggleButton,
          ]}
        >
          <Text style={activeTab === 'User' ? styles.activeText : styles.inactiveText}>
            User
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('Responder')}
          style={[
            styles.toggleButton,
            styles.rightToggleButton,
            activeTab === 'Responder' ? styles.activeToggleButton : styles.inactiveToggleButton,
          ]}
        >
          <Text style={activeTab === 'Responder' ? styles.activeText : styles.inactiveText}>
            Responder
          </Text>
        </Pressable>
      </View>

      {/* Form Input with Username */}
      <View style={styles.inputView}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#006E60', marginTop: 50, marginBottom: 20 }}>
          Welcome to AbTech!
        </Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#295E4E" style={styles.icon} />
          <TextInput
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            keyboardType="default" // Correct type for username input
            placeholderTextColor="#295E4E"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#295E4E" style={styles.icon} />
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={!showPassword} // Toggles visibility based on state
            placeholderTextColor="#295E4E"
          />
          {/* Toggle Visibility Icon */}
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#295E4E"
              style={styles.icon}
            />
          </Pressable>
        </View>

        {/* Forgot Password Link */}
        <Text onPress={() => alert('Forgot Password')} style={{ marginTop: 10, marginLeft: 200 }}>
          Forgot Password?
        </Text>

        {/* Submit Button */}
        <TouchableOpacity style={{ width: '90%' }} onPress={()=> router.push('/(app)/home')}>
          <View style={styles.submitButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </View>
        </TouchableOpacity>

        <View>
          <Text style={{fontSize: 16,}}>New To AbTech? 
            <Text style={{textDecorationLine:'underline', fontSize: 16,}}
              onPress={()=> router.push('/signUp') }>Get Started</Text></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputView: {
    position: 'absolute',
    top: 300, // Adjust position as necessary to match your design
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '90%',
    height: 50,
    borderRadius: 8,
    marginTop: 20,
  },
  toggleButtonsContainer: {
    position: 'absolute',
    top: 280, // Adjust position as necessary to match your design
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundtoggle: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    left: 80,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#295E4E', // Greenish border color for the toggle buttons container
  },
  leftToggleButton: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  rightToggleButton: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  activeToggleButton: {
    backgroundColor: '#FFA500',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50, // Orange for the active button
  },
  inactiveToggleButton: {
    backgroundColor: 'white', // Inactive button with white background
  },
  activeText: {
    color: 'white', // White text for active state
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#FFA500', // Orange text for inactive state
    fontWeight: 'bold',
  },
  input: {
    fontSize: 14,
    flex: 1,
    color: '#295E4E',
    marginLeft: 5,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: '#295E4E',
    paddingHorizontal: 20,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderRadius: 30,
    // Orange border color for the submit button
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18, // Equivalent to 'text-lg'
    fontWeight: 'bold', // Equivalent to 'font-bold'
  },
});

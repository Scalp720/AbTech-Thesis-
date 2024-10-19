import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { router } from 'expo-router';
import ResMap from './resMap'; // Import the ResMap component'

export default function Home() {
    const navigation = useNavigation(); // Get the navigation object
    const [isOnline, setIsOnline] = useState(true); // State for Online/Offline status

    const toggleStatus = () => {
        setIsOnline(!isOnline); // Toggle between online and offline
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light" backgroundColor="black" />

            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()} // Go back to the previous screen
                >
                    <AntDesign name="arrowleft" size={24} color="green" />
                </TouchableOpacity>
                <Image source={require('../../assets/images/src/logo.png')} style={styles.logo} />
            </View>

            {/* Rescuer Card Section */}
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>Rescuer Name: Joe Doe</Text>
                    <Text style={styles.text}>Contact Number: 09949855636</Text>
                    <Text style={styles.text}>Position: Lead Team</Text>
                    <View style={styles.organizationContainer}>
                        <Image
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Red_Cross_Logo.png/1200px-Red_Cross_Logo.png' }}
                            style={styles.rescueLogo}
                        />
                        <Text style={styles.organizationText}>Red Cross</Text>
                    </View>
                </View>

                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/80' }} // Replace with actual profile image URL
                        style={styles.profilePic}
                    />
                </View>

                {/* Pressable Status Switch */}
                <Pressable
                    style={[styles.statusSwitch, { backgroundColor: isOnline ? 'green' : 'red' }]} // Dynamic background color
                    onPress={toggleStatus}
                >
                    <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
                </Pressable>
            </View>
            <View style={{ marginTop: 20, padding: 15 }} >
                <Text style={{ textDecorationLine: 'underline', fontSize: 16, fontWeight: 600, color: 'Green' }} onPress={() => router.push('/resMap')} >View Map</Text>
            </View>
            <View style={{ height: 400, width: '100%', padding: 10, borderRadius: '40', overflow: 'hidden' }} >
                <ResMap showBackButton={false} />
            </View>
            <View style={{ maxWidth: '95%', margin: 10, height: 80, backgroundColor: 'blue', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                    <TouchableOpacity style={styles.icons}>
                        <Feather name='home' size={24} color="white" />
                        <Text style={styles.iconstext}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icons}>
                        <Feather name='users' size={24} color="white" />
                        <Text style={styles.iconstext}>Team</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icons} >
                        <MaterialCommunityIcons name='history' size={24} color="white" />
                        <Text style={styles.iconstext}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icons}>
                        <Feather name='settings' size={24} color="white" />
                        <Text style={styles.iconstext}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#f0f0f0',
    },
    icons:{
        alignItems: 'center',
    },
    iconstext: {
        marginTop: 5,
        color: 'white',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 15,
        top: 10,
        padding: 10,
    },
    logo: {
        width: 60,
        height: 60,
    },
    card: {
        backgroundColor: '#F0D28E',
        borderRadius: 15,
        padding: 20,
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginTop: 10,
        alignSelf: 'center',
    },
    cardContent: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        color: '#2F4F4F',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        color: '#2F4F4F',
        marginTop: 5,
    },
    organizationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    rescueLogo: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
    organizationText: {
        fontSize: 16,
        color: '#2F4F4F',
    },
    profileSection: {
        alignItems: 'center',
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: '#F0D28E',
        borderWidth: 2,
    },
    statusSwitch: {
        position: 'absolute',
        top: 5,
        right: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    statusText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

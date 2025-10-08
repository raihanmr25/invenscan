import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

const logo = require('../../assets/logodisnaker.png');
const backgroundImage = require('../../assets/background.jpg');

export default function WelcomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme(); 
  const isDarkMode = colorScheme === 'dark';

  return (
    <ImageBackground 
      source={backgroundImage} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }]}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>InvenScan</Text>
        {/* NEW: Subtitle added below the main title */}
        <Text style={styles.subtitle}>Dinas Tenaga Kerja Semarang</Text>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: isDarkMode ? '#0A84FF' : '#007BFF' }]} 
          onPress={() => router.push('/scanner')}
        >
          <Text style={styles.buttonText}>Mulai Scan</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 32, // Made title slightly bigger for more impact
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 10, // Reduced space to bring subtitle closer
  },
  // NEW: Style for the subtitle
  subtitle: {
    fontSize: 18,
    color: '#E0E0E0', // Slightly dimmer white for contrast
    textAlign: 'center',
    marginBottom: 50, // Added space before the button
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
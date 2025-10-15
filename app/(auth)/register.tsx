import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

// path untuk logo
const dinasLogo = require('../../assets/logodisnaker.png'); 

// komponen utama
export default function RegisterScreen() {
  const router = useRouter();

  const onRegisterPress = () => {
    Alert.alert(
      'Success',
      'Account created! Please log in.',
      [
        { text: 'OK', onPress: () => router.replace('/login') } // Go to login screen
      ]
    );
  };

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.cardContainer}>
        <Image source={dinasLogo} style={styles.logo} />
        <Text style={styles.subtitle}>Dinas Tenaga Kerja Semarang</Text>
        <Text style={styles.cardTitle}>Register</Text>

        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" keyboardType="email-address"/>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
        
        <TouchableOpacity style={styles.actionButton} onPress={onRegisterPress}>
          <Text style={styles.actionButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginPrompt} onPress={() => router.back()}>
          <Text style={styles.loginPromptText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// komponen styles untuk mengatur tampilan komponen di layar ini
const styles = StyleSheet.create({
  fullScreenContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A2533', },
  cardContainer: { width: '90%', maxWidth: 380, backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 8, },
  logo: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 10, },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 20, },
  cardTitle: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 25, },
  input: { width: '100%', height: 50, borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, backgroundColor: '#F9F9F9', color: '#333', },
  actionButton: { width: '100%', backgroundColor: '#0A2533', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, },
  actionButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', },
  loginPrompt: { marginTop: 30, },
  loginPromptText: { fontSize: 15, color: '#555', },
  loginLink: { color: '#0A2533', fontWeight: 'bold', },
});
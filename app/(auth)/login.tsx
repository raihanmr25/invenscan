import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Checkbox from 'expo-checkbox'; 
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

/**
     * Email dan password yang digunakan untuk login
     * Email: test@example.com
     * Password: Test!234
     */

// path untuk logo
const dinasLogo = require('../../assets/logodisnaker.png'); 

// komponen utama
export default function LoginScreen() {
  const [username, setUsername] = React.useState(''); // This state holds the email
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false); // Add a loading state for the button
  const { signIn } = useAuth();
  const router = useRouter();

  const onLoginPress = async () => {
    setIsLoading(true); // Start loading
    try {
      // Pass both the email (from the username state) and the password
      const success = await signIn(username, password);
      
      if (!success) {
        Alert.alert('Login Failed', 'Please check your email and password.');
      }
      // If successful, the AuthContext will automatically redirect.
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', 'An unexpected error occurred.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.cardContainer}>
        <Image source={dinasLogo} style={styles.logo} />
        <Text style={styles.subtitle}>Dinas Tenaga Kerja Semarang</Text>
        <Text style={styles.cardTitle}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <View style={styles.optionsContainer}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? '#0A2533' : undefined}
            />
            <Text style={styles.checkboxLabel}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerPrompt} onPress={() => router.push('/register')}>
          <Text style={styles.registerPromptText}>
            Don't have an account? <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Kumpulan styles untuk mengatur tampilan komponen di layar ini
const styles = StyleSheet.create({
  fullScreenContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A2533', },
  cardContainer: { width: '90%', maxWidth: 380, backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 8, },
  logo: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 10, },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 20, },
  cardTitle: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 25, },
  input: { width: '100%', height: 50, borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, backgroundColor: '#F9F9F9', color: '#333', },
  loginButton: { width: '100%', backgroundColor: '#0A2533', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginBottom: 30, minHeight: 50, justifyContent: 'center' },
  loginButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', },
  registerPrompt: { marginTop: 20, },
  registerPromptText: { fontSize: 15, color: '#555', },
  registerLink: { color: '#0A2533', fontWeight: 'bold', },
  optionsContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', },
  checkboxLabel: { marginLeft: 8, fontSize: 14, color: '#333', },
  forgotPasswordText: { color: '#0A2533', fontSize: 14, fontWeight: '600', },
});
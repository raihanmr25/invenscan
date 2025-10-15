import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// komponen utama
export default function ForgotPasswordScreen() {
  const router = useRouter();

  const onSendLinkPress = () => {
    Alert.alert(
      'Check Your Email',
      'If an account with this email exists, a password reset link has been sent. (This is a simulation).',
      [
        { text: 'OK', onPress: () => router.push('/reset-password') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email address and we'll send you a link to reset your password.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Button title="Send Reset Link" onPress={onSendLinkPress} />
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// Kumpulan styles untuk mengatur tampilan komponen di layar ini
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 24 },
  input: { height: 44, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 20, paddingHorizontal: 10, fontSize: 16 },
  linkText: { color: '#007BFF', textAlign: 'center', marginTop: 20 },
});
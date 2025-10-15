import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// komponen utama
export default function ResetPasswordScreen() {
  const router = useRouter();

  const onResetPress = () => {
    Alert.alert(
      'Password Updated',
      'Your password has been successfully reset. Please login with your new password.',
      [
        { text: 'OK', onPress: () => router.replace('/login') }, // Use replace to clear the history
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput style={styles.input} placeholder="New Password" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm New Password" secureTextEntry />
      <Button title="Set New Password" onPress={onResetPress} />
    </View>
  );
}

// Kumpulan styles untuk mengatur tampilan komponen di layar ini
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { height: 44, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 20, paddingHorizontal: 10, fontSize: 16 },
});
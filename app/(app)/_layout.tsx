import { Stack } from 'expo-router';
import { Button } from 'react-native';
import LogoTitle from '../../components/logotitle';
import { useAuth } from '../../context/AuthContext'; 

export default function AppLayout() {
  const { signOut } = useAuth();

// Stack navigator digunakan untuk mengatur layar-layar dalam aplikasi.
// Setiap `Stack.Screen` merepresentasikan satu layar.
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: true,
          title: "InvenScan",
          headerLeft: () => <LogoTitle />,
          headerRight: () => <Button onPress={signOut} title="Logout" />
        }} 
      />
      <Stack.Screen 
        name="scanner" 
        options={{ 
          title: 'Dinas Tenaga Kerja',
          headerLeft: () => <LogoTitle />,
        }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ title: 'Detail Aset' }} 
      />
    </Stack>
  );
}
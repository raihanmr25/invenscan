import { Slot } from "expo-router";
import { AuthProvider, useAuth, useProtectedRoute } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

// komponen utama 
function ProtectedLayout() {
  const { session, isLoading } = useAuth();

  useProtectedRoute(session, isLoading);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Once loading is complete, show the screen
  return <Slot />;
}

// Komponen layout root dari seluruh aplikasi
export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
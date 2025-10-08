import { Slot } from "expo-router";
import { AuthProvider, useAuth, useProtectedRoute } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

function ProtectedLayout() {
  // Get both session and isLoading from the context
  const { session, isLoading } = useAuth();

  // Pass both arguments to the protection hook
  useProtectedRoute(session, isLoading);

  // While the auth state is loading, show a spinner
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

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
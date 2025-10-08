import { useRouter, useSegments } from "expo-router";
import React from "react";
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'api-auth-token';
// IMPORTANT: Make sure this is your computer's correct IP address.
const API_URL = 'http://192.168.16.13:8000'; 

const AuthContext = React.createContext<{ session?: string | null; signIn: (email, password) => Promise<boolean>; signOut: () => void; isLoading: boolean; } | null>(null);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export function useProtectedRoute(session, isLoading) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoading) return;
    const inAuthGroup = segments[0] === "(auth)";
    if (segments.length < 1) return;

    if (!session && !inAuthGroup) router.replace("/login");
    else if (session && inAuthGroup) router.replace("/");
  }, [session, segments, router, isLoading]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) setSession(token);
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        console.error("Login failed:", await response.text());
        return false;
      }

      const { token } = await response.json();
      if (token) {
        setSession(token);
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        return true;
      }
      return false;
    } catch (e) {
      console.error("An error occurred during sign in:", e);
      return false;
    }
  };

  const signOut = async () => {
    setSession(null);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  };
  
  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
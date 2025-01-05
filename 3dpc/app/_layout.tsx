import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
    
  );
}

export const App = () => {
  const { authState, onLogout } = useAuth();
  return (
    <Stack>
      {authState?.authenticated ? (        
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ):(
        <Stack.Screen name="index" options={{ title: 'Login' }} />
      )}
        <Stack.Screen name="+not-found" />
    </Stack>
  )
}

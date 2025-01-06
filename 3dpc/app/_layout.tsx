import { Stack } from 'expo-router';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light"><AuthProvider>
        <App />
      </AuthProvider></GluestackUIProvider>
  );
}

export const App = () => {
  const { authState, onLogout } = useAuth();
  return (
    <>
    <StatusBar style="light" />

    <Stack>
      {authState?.authenticated ? (        
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ):(
        <Stack.Screen name="index" options={{ headerShown: false }}/>
      )}
        <Stack.Screen name="+not-found" />
    </Stack>
    </>
  )
}

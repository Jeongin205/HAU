import "react-native-reanimated";
import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from "expo-router";
import { useAuth } from '../hooks/useAuth';
import "../global.css";

export default function RootLayout() {
  const { session, initialized, initialize } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === 'login';

    if (!session && !inAuthGroup) {
      // Redirect to login if user is not authenticated and not on the login screen
      router.replace('/login');
    } else if (session && inAuthGroup) {
      // Redirect away from login if user is authenticated
      router.replace('/');
    }
  }, [session, initialized, segments]);

  if (!initialized) {
    return null; // Optionally return a splash screen here
  }

  return <Slot />;
}

import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../AuthProvider';


export default function AppLayout() {
  const { authState, userState, onLogout } = useAuth();


  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!authState?.authenticated) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }
  if (userState?.role === "admin") {
    return <Redirect href="/manageEvents" />
  }

  // This layout can be deferred because it's not the root layout.
  return (
  <Stack screenOptions={{
    headerShown: false,  // This will hide the header
  }}/>
  )
}

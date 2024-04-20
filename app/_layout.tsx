import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@rneui/themed';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { theme } from '@/constants/Colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'home',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Roboto_700Bold,
    OpenSans_600SemiBold,
    Lato_400Regular,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="add/log" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

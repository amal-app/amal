import { ThemeProvider } from '@rneui/themed';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from 'react-native';
import { CreateTheme } from '@/constants/Colors';
import { RootSiblingParent } from 'react-native-root-siblings';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/',
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
  const colorScheme = useColorScheme();
  const theme = CreateTheme(colorScheme === 'dark' ? 'dark' : 'light');
  return (
    <ThemeProvider theme={theme}>
      <RootSiblingParent>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="add/log/index" />
          <Stack.Screen name="add/log/quran" />
        </Stack>
      </RootSiblingParent>
    </ThemeProvider>
  );
}

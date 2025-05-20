import { useAuthStore } from "@/store/authStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ErrorBoundary } from "./error-boundary";

// Create a client
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    } else {
      router.replace("/auth");
    }
    // Only run when isAuthenticated changes
  }, [isAuthenticated, router]);

  if (isAuthenticated === undefined) {
    // Optionally show a loading indicator while auth state is being determined
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" options={{ animation: 'fade' }} />
      <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
      <Stack.Screen name="video/[id]" options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
      <Stack.Screen name="comments/[id]" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      <Stack.Screen name="profile/[id]" options={{ headerShown: true, animation: 'slide_from_right' }} />
      <Stack.Screen name="chat/[id]" options={{ headerShown: true, animation: 'slide_from_right' }} />
      <Stack.Screen name="notifications" options={{ headerShown: true, animation: 'slide_from_right' }} />
      <Stack.Screen name="edit-profile" options={{ headerShown: true, animation: 'slide_from_right' }} />
    </Stack>
  );
}
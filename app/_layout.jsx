import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ClerkProvider, SignedOut, SignedIn } from "@clerk/clerk-expo";
import LoginScreen from "@/components/LoginScreen";

export default function RootLayout() {
  useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    nagasaki: require("../assets/fonts/nagasaki.ttf"),
  });

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>

      <SignedOut>
        <LoginScreen />{" "}
      </SignedOut>
    </ClerkProvider>
  );
}

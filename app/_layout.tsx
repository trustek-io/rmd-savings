// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderNavigation from '../components/HeaderNavigation';
import BottomNavigation from '../components/BottomNavigation';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            {/* Fixed Header Navigation for Web */}
            <HeaderNavigation />

            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'white' },
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="dashboard" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="kyc" />
            </Stack>

            {/* Fixed Bottom Navigation for Mobile */}
            <BottomNavigation />

            <StatusBar style="auto" />
        </SafeAreaProvider>
    );
}
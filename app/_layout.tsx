import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'white' },
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="dashboard" />
                <Stack.Screen name="portfolio" />
                <Stack.Screen name="transactions" />
                <Stack.Screen name="settings" />
                <Stack.Screen name="kyc" />
            </Stack>
            <StatusBar style="auto" />
        </SafeAreaProvider>
    );
}
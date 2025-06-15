// app/kyc/_layout.tsx
import { Stack } from 'expo-router';

export default function KYCLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                presentation: 'card',
                animation: 'slide_from_right',
                contentStyle: { backgroundColor: 'white' },
            }}
        >
            <Stack.Screen name="start" />
            <Stack.Screen name="personal-info" />
            <Stack.Screen name="id-upload" />
            <Stack.Screen name="review" />
        </Stack>
    );
}
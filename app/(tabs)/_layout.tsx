import React from 'react';
import { Stack } from 'expo-router';

export default function TabsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="overview" />
            <Stack.Screen name="portfolio" />
            <Stack.Screen name="transactions" />
            <Stack.Screen name="settings" />
        </Stack>
    );
}
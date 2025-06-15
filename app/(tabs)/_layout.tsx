// app/(tabs)/_layout.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;

const tabs = [
    { name: 'overview', label: 'Overview', icon: 'home' },
    { name: 'portfolio', label: 'Portfolio', icon: 'pie-chart' },
    { name: 'transactions', label: 'Transactions', icon: 'list' },
    { name: 'settings', label: 'Settings', icon: 'settings' },
];

export default function TabsLayout() {
    const router = useRouter();
    const segments = useSegments();

    // Get current active tab
    const currentTab = segments[1] || 'overview';

    const handleTabPress = (tabName: string) => {
        if (tabName === 'overview') {
            router.push('/dashboard');
        } else {
            router.push(`/(tabs)/${tabName}`);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="overview" />
                <Stack.Screen name="portfolio" />
                <Stack.Screen name="transactions" />
                <Stack.Screen name="settings" />
            </Stack>

            {/* Bottom Navigation - Mobile Only */}
            {!isLargeScreen && (
                <View style={styles.bottomNav}>
                    <View style={styles.bottomNavContainer}>
                        {tabs.map((tab) => {
                            const isActive = currentTab === tab.name || (currentTab === 'dashboard' && tab.name === 'overview');

                            return (
                                <TouchableOpacity
                                    key={tab.name}
                                    style={styles.bottomNavTab}
                                    onPress={() => handleTabPress(tab.name)}
                                >
                                    <Ionicons
                                        name={tab.icon as any}
                                        size={22}
                                        color={isActive ? '#6366f1' : '#9ca3af'}
                                    />
                                    <Text style={[
                                        styles.bottomNavTabText,
                                        isActive && styles.bottomNavTabTextActive
                                    ]}>
                                        {tab.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingBottom: Platform.OS === 'ios' ? 34 : 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    bottomNavContainer: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingHorizontal: 8,
    },
    bottomNavTab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 4,
    },
    bottomNavTabText: {
        fontSize: 10,
        color: '#9ca3af',
        marginTop: 2,
        fontWeight: '500',
    },
    bottomNavTabTextActive: {
        color: '#6366f1',
        fontWeight: '600',
    },
});
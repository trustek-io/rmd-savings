// components/BottomNavigation.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;

const tabs = [
    { name: 'dashboard', label: 'Overview', icon: 'home', route: '/dashboard' },
    { name: 'portfolio', label: 'Portfolio', icon: 'pie-chart', route: '/(tabs)/portfolio' },
    { name: 'transactions', label: 'Transactions', icon: 'list', route: '/(tabs)/transactions' },
    { name: 'settings', label: 'Settings', icon: 'settings', route: '/(tabs)/settings' },
];

export default function BottomNavigation() {
    const router = useRouter();
    const pathname = usePathname();

    // Debug: Log pathname to see what we're getting
    console.log('BottomNavigation pathname:', pathname);

    // Don't show on large screens, auth/kyc pages, or index page
    if (isLargeScreen ||
        pathname.includes('(auth)') ||
        pathname.includes('auth') ||
        pathname.includes('kyc') ||
        pathname === '/' ||
        pathname === '/index' ||
        pathname.includes('login') ||
        pathname.includes('signup') ||
        pathname.includes('verify-otp') ||
        pathname.endsWith('/login') ||
        pathname.endsWith('/signup') ||
        pathname.startsWith('/(auth)') ||
        pathname.startsWith('/auth')) {
        return null;
    }

    const getActiveTab = () => {
        if (pathname === '/dashboard' || pathname === '/') return 'dashboard';
        if (pathname.includes('portfolio')) return 'portfolio';
        if (pathname.includes('transactions')) return 'transactions';
        if (pathname.includes('settings')) return 'settings';
        return 'dashboard';
    };

    const activeTab = getActiveTab();

    const handleTabPress = (route: string) => {
        router.push(route);
    };

    return (
        <View style={styles.container}>
            <View style={styles.navContainer}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.name;

                    return (
                        <TouchableOpacity
                            key={tab.name}
                            style={styles.navTab}
                            onPress={() => handleTabPress(tab.route)}
                        >
                            <Ionicons
                                name={tab.icon as any}
                                size={22}
                                color={isActive ? '#6366f1' : '#9ca3af'}
                            />
                            <Text style={[
                                styles.navTabText,
                                isActive && styles.navTabTextActive
                            ]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    navContainer: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingHorizontal: 8,
    },
    navTab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 4,
    },
    navTabText: {
        fontSize: 10,
        color: '#9ca3af',
        marginTop: 2,
        fontWeight: '500',
    },
    navTabTextActive: {
        color: '#6366f1',
        fontWeight: '600',
    },
});
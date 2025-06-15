// components/HeaderNavigation.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;

const tabs = [
    { name: 'dashboard', label: 'Overview', route: '/dashboard' },
    { name: 'portfolio', label: 'Portfolio', route: '/(tabs)/portfolio' },
    { name: 'transactions', label: 'Transactions', route: '/(tabs)/transactions' },
    { name: 'settings', label: 'Settings', route: '/(tabs)/settings' },
];

export default function HeaderNavigation() {
    const router = useRouter();
    const pathname = usePathname();

    // Debug: Log pathname to see what we're getting
    console.log('HeaderNavigation pathname:', pathname);

    // Only show on large screens and not on auth/kyc/index pages
    if (!isLargeScreen ||
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

    const handleLogout = () => {
        router.replace('/(auth)/login');
    };

    return (
        <View style={styles.header}>
            <View style={styles.logoContainer}>
                <LinearGradient
                    colors={['#6366f1', '#3b82f6']}
                    style={styles.logo}
                >
                    <Ionicons name="trending-up" size={24} color="white" />
                </LinearGradient>
                <Text style={styles.appName}>RampMeDaddy</Text>
            </View>

            <View style={styles.navTabs}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.name;

                    return (
                        <TouchableOpacity
                            key={tab.name}
                            style={[styles.navTab, isActive && styles.activeNavTab]}
                            onPress={() => handleTabPress(tab.route)}
                        >
                            <Text style={[styles.navTabText, isActive && styles.activeNavTabText]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TouchableOpacity onPress={handleLogout} style={styles.userSection}>
                <Text style={styles.userName}>Your Name</Text>
                <Ionicons name="chevron-down" size={16} color="#6b7280" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        paddingHorizontal: 32,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        zIndex: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    navTabs: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navTab: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeNavTab: {
        borderBottomColor: '#14b8a6',
    },
    navTabText: {
        fontSize: 16,
        color: '#6b7280',
        fontWeight: '500',
    },
    activeNavTabText: {
        color: '#0f172a',
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontSize: 14,
        color: '#374151',
        marginRight: 8,
    },
});
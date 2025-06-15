import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;

export default function SettingsScreen() {
    const containerStyle = isLargeScreen ? [styles.container, styles.webContainer] : styles.container;

    return (
        <SafeAreaView style={containerStyle}>
            <View style={styles.content}>
                <Text style={styles.title}>Settings</Text>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => router.replace('/(auth)/login')}
                >
                    <Ionicons name="log-out-outline" size={20} color="#dc2626" />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Navigation - Mobile Only */}
            {!isLargeScreen && (
                <View style={styles.bottomNav}>
                    <View style={styles.bottomNavContainer}>
                        <TouchableOpacity
                            style={styles.bottomNavTab}
                            onPress={() => router.push('/dashboard')}
                        >
                            <Ionicons name="home" size={22} color="#9ca3af" />
                            <Text style={styles.bottomNavTabText}>Overview</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.bottomNavTab}
                            onPress={() => router.push('/portfolio')}
                        >
                            <Ionicons name="pie-chart" size={22} color="#9ca3af" />
                            <Text style={styles.bottomNavTabText}>Portfolio</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.bottomNavTab}
                            onPress={() => router.push('/transactions')}
                        >
                            <Ionicons name="list" size={22} color="#9ca3af" />
                            <Text style={styles.bottomNavTabText}>Transactions</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.bottomNavTab}
                            onPress={() => router.push('/settings')}
                        >
                            <Ionicons name="settings" size={22} color="#6366f1" />
                            <Text style={[styles.bottomNavTabText, styles.bottomNavTabTextActive]}>
                                Settings
                            </Text>
                        </TouchableOpacity>
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
    webContainer: {
        maxWidth: 1200,
        alignSelf: 'center',
        width: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        paddingBottom: isLargeScreen ? 24 : 120,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 32,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fef2f2',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fecaca',
    },
    logoutText: {
        color: '#dc2626',
        fontWeight: '500',
        marginLeft: 8,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingBottom: 34,
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
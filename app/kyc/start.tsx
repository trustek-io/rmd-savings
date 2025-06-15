// app/kyc/start.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;

export default function KYCStartScreen() {
    const steps = [
        {
            icon: 'person-outline',
            title: 'Personal Information',
            description: 'Provide your basic details and contact information',
            time: '2 minutes',
        },
        {
            icon: 'document-text-outline',
            title: 'Identity Verification',
            description: 'Upload photos of your government-issued ID',
            time: '3 minutes',
        },
        {
            icon: 'shield-checkmark-outline',
            title: 'Final Review',
            description: 'Review your information and complete verification',
            time: '1 minute',
        },
    ];

    const containerStyle = isLargeScreen ? [styles.container, styles.webContainer] : styles.container;

    return (
        <SafeAreaView style={containerStyle}>
            <ScrollView
                style={styles.content}
                contentContainerStyle={[
                    styles.scrollContent,
                    isLargeScreen && styles.webScrollContent
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#6366f1" />
                    </TouchableOpacity>

                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '33%' }]} />
                        </View>
                        <Text style={styles.progressText}>Step 1 of 3</Text>
                    </View>
                </View>

                {/* Main Content */}
                <View style={styles.mainContent}>
                    <LinearGradient
                        colors={['#6366f1', '#3b82f6']}
                        style={styles.iconContainer}
                    >
                        <Ionicons name="shield-checkmark" size={32} color="white" />
                    </LinearGradient>

                    <Text style={styles.title}>Complete Your Application</Text>
                    <Text style={styles.subtitle}>
                        We need to verify your identity to comply with financial regulations.
                        This process is secure and typically takes less than 5 minutes.
                    </Text>

                    {/* Steps */}
                    <View style={styles.stepsContainer}>
                        <Text style={styles.stepsTitle}>What you'll need:</Text>

                        {steps.map((step, index) => (
                            <View key={index} style={styles.stepItem}>
                                <View style={styles.stepIcon}>
                                    <Ionicons name={step.icon as any} size={20} color="#6366f1" />
                                </View>
                                <View style={styles.stepContent}>
                                    <Text style={styles.stepTitle}>{step.title}</Text>
                                    <Text style={styles.stepDescription}>{step.description}</Text>
                                </View>
                                <Text style={styles.stepTime}>{step.time}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Requirements */}
                    <View style={styles.requirementsContainer}>
                        <Text style={styles.requirementsTitle}>You'll need one of these IDs:</Text>
                        <View style={styles.idOptions}>
                            <View style={styles.idOption}>
                                <Ionicons name="card-outline" size={16} color="#6b7280" />
                                <Text style={styles.idText}>Driver's License</Text>
                            </View>
                            <View style={styles.idOption}>
                                <Ionicons name="airplane-outline" size={16} color="#6b7280" />
                                <Text style={styles.idText}>Passport</Text>
                            </View>
                            <View style={styles.idOption}>
                                <Ionicons name="shield-outline" size={16} color="#6b7280" />
                                <Text style={styles.idText}>State ID</Text>
                            </View>
                        </View>
                    </View>

                    {/* Security Note */}
                    <View style={styles.securityNote}>
                        <Ionicons name="lock-closed" size={16} color="#059669" />
                        <Text style={styles.securityText}>
                            Your information is encrypted and secured with bank-level security.
                            We never store your ID photos permanently.
                        </Text>
                    </View>
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => router.push('/kyc/personal-info')}
                >
                    <Text style={styles.continueButtonText}>Start Verification</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    webContainer: {
        maxWidth: 600,
        alignSelf: 'center',
        width: '100%',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: isLargeScreen ? 32 : 24,
    },
    webScrollContent: {
        paddingHorizontal: 32,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    backButton: {
        padding: 8,
        marginRight: 16,
    },
    progressContainer: {
        flex: 1,
    },
    progressBar: {
        height: 4,
        backgroundColor: '#e5e7eb',
        borderRadius: 2,
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#6366f1',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '500',
    },
    mainContent: {
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    stepsContainer: {
        width: '100%',
        marginBottom: 32,
    },
    stepsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 16,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    stepIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 4,
    },
    stepDescription: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
    },
    stepTime: {
        fontSize: 12,
        color: '#9ca3af',
        fontWeight: '500',
    },
    requirementsContainer: {
        width: '100%',
        marginBottom: 24,
    },
    requirementsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 12,
    },
    idOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    idOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        flex: isLargeScreen ? 0 : 1,
        minWidth: isLargeScreen ? 120 : 0,
    },
    idText: {
        fontSize: 14,
        color: '#6b7280',
        marginLeft: 6,
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ecfdf5',
        padding: 16,
        borderRadius: 12,
        width: '100%',
    },
    securityText: {
        fontSize: 14,
        color: '#065f46',
        marginLeft: 12,
        flex: 1,
        lineHeight: 20,
    },
    continueButton: {
        backgroundColor: '#6366f1',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: isLargeScreen ? 0 : 24,
        marginTop: 32,
    },
    continueButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        marginRight: 8,
    },
});
// app/kyc/review.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;

export default function KYCReviewScreen() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Mock data - in real app, this would come from previous screens
    const userData = {
        personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '01/15/1990',
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            phoneNumber: '(555) 123-4567',
        },
        documents: {
            frontId: 'uploaded',
            backId: 'uploaded',
        }
    };

    const handleSubmit = async () => {
        if (!agreedToTerms) {
            Alert.alert('Agreement Required', 'Please agree to the terms and conditions to continue.');
            return;
        }

        setIsSubmitting(true);

        try {
            // TODO: Submit KYC data to your backend
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call

            // Go directly back to dashboard
            router.replace('/dashboard');
        } catch (error) {
            Alert.alert(
                'Submission Failed',
                'There was an error submitting your application. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const InfoRow = ({ label, value }: { label: string; value: string }) => (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );

    const InfoSection = ({
                             title,
                             icon,
                             children,
                             onEdit
                         }: {
        title: string;
        icon: string;
        children: React.ReactNode;
        onEdit: () => void;
    }) => (
        <View style={styles.infoSection}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                    <Ionicons name={icon as any} size={20} color="#6366f1" />
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                <TouchableOpacity onPress={onEdit} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );

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
                        disabled={isSubmitting}
                    >
                        <Ionicons name="arrow-back" size={24} color="#6366f1" />
                    </TouchableOpacity>

                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '100%' }]} />
                        </View>
                        <Text style={styles.progressText}>Step 3 of 3</Text>
                    </View>
                </View>

                {/* Main Content */}
                <View style={styles.mainContent}>
                    <LinearGradient
                        colors={['#6366f1', '#3b82f6']}
                        style={styles.iconContainer}
                    >
                        <Ionicons name="checkmark-circle" size={32} color="white" />
                    </LinearGradient>

                    <Text style={styles.title}>Review Your Information</Text>
                    <Text style={styles.subtitle}>
                        Please review your information below. Make sure everything is accurate before submitting.
                    </Text>

                    {/* Personal Information Section */}
                    <InfoSection
                        title="Personal Information"
                        icon="person-outline"
                        onEdit={() => router.push('/kyc/personal-info')}
                    >
                        <InfoRow label="Name" value={`${userData.personalInfo.firstName} ${userData.personalInfo.lastName}`} />
                        <InfoRow label="Date of Birth" value={userData.personalInfo.dateOfBirth} />
                        <InfoRow label="Phone" value={userData.personalInfo.phoneNumber} />
                        <InfoRow
                            label="Address"
                            value={`${userData.personalInfo.address}, ${userData.personalInfo.city}, ${userData.personalInfo.state} ${userData.personalInfo.zipCode}`}
                        />
                    </InfoSection>

                    {/* Identity Documents Section */}
                    <InfoSection
                        title="Identity Documents"
                        icon="document-text-outline"
                        onEdit={() => router.push('/kyc/id-upload')}
                    >
                        <View style={styles.documentStatus}>
                            <View style={styles.documentItem}>
                                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                                <Text style={styles.documentText}>Front of ID uploaded</Text>
                            </View>
                            <View style={styles.documentItem}>
                                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                                <Text style={styles.documentText}>Back of ID uploaded</Text>
                            </View>
                        </View>
                    </InfoSection>

                    {/* Terms Agreement */}
                    <View style={styles.termsContainer}>
                        <TouchableOpacity
                            onPress={() => setAgreedToTerms(!agreedToTerms)}
                            style={styles.checkboxContainer}
                            disabled={isSubmitting}
                        >
                            <View style={[
                                styles.checkbox,
                                agreedToTerms && styles.checkboxChecked
                            ]}>
                                {agreedToTerms && (
                                    <Ionicons name="checkmark" size={16} color="white" />
                                )}
                            </View>
                            <Text style={styles.checkboxText}>
                                I certify that the information provided is true and accurate. I agree to the{' '}
                                <Text style={styles.linkText}>Terms of Service</Text>
                                {' '}and{' '}
                                <Text style={styles.linkText}>Privacy Policy</Text>
                                {', and I consent to identity verification processing.'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Processing Time Notice */}
                    <View style={styles.processingNotice}>
                        <Ionicons name="time-outline" size={20} color="#6366f1" />
                        <View style={styles.processingContent}>
                            <Text style={styles.processingTitle}>Processing Time</Text>
                            <Text style={styles.processingText}>
                                Identity verification typically takes 24-48 hours. You'll receive an email
                                once your application has been reviewed.
                            </Text>
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            (!agreedToTerms || isSubmitting) && styles.submitButtonDisabled
                        ]}
                        onPress={handleSubmit}
                        disabled={!agreedToTerms || isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <ActivityIndicator color="white" size="small" />
                                <Text style={styles.submitButtonText}>Submitting Application...</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.submitButtonText}>Submit Application</Text>
                                <Ionicons name="send" size={20} color="white" />
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Security Footer */}
                    <View style={styles.securityFooter}>
                        <Ionicons name="shield-checkmark" size={16} color="#059669" />
                        <Text style={styles.securityText}>
                            Your information is encrypted and processed securely in compliance with
                            financial regulations and privacy laws.
                        </Text>
                    </View>
                </View>
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
    infoSection: {
        width: '100%',
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
        marginLeft: 8,
    },
    editButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#6366f1',
    },
    editButtonText: {
        fontSize: 14,
        color: '#6366f1',
        fontWeight: '500',
    },
    sectionContent: {
        gap: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    infoLabel: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '500',
        flex: 1,
    },
    infoValue: {
        fontSize: 14,
        color: '#0f172a',
        fontWeight: '500',
        flex: 2,
        textAlign: 'right',
    },
    documentStatus: {
        gap: 8,
    },
    documentItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    documentText: {
        fontSize: 14,
        color: '#0f172a',
        marginLeft: 8,
    },
    termsContainer: {
        width: '100%',
        marginVertical: 24,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#d1d5db',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    checkboxChecked: {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
    },
    checkboxText: {
        fontSize: 14,
        color: '#374151',
        flex: 1,
        lineHeight: 20,
    },
    linkText: {
        color: '#6366f1',
        fontWeight: '500',
    },
    processingNotice: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#eff6ff',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        marginBottom: 24,
    },
    processingContent: {
        marginLeft: 12,
        flex: 1,
    },
    processingTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e40af',
        marginBottom: 4,
    },
    processingText: {
        fontSize: 14,
        color: '#1e40af',
        lineHeight: 20,
    },
    submitButton: {
        backgroundColor: '#6366f1',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 24,
    },
    submitButtonDisabled: {
        backgroundColor: '#d1d5db',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        marginRight: 8,
    },
    securityFooter: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ecfdf5',
        padding: 16,
        borderRadius: 12,
        width: '100%',
    },
    securityText: {
        fontSize: 12,
        color: '#065f46',
        marginLeft: 12,
        flex: 1,
        lineHeight: 18,
    },
});
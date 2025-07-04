// app/(auth)/signup.tsx - FIXED VERSION
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;

export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignup = async () => {
        console.log('handleSignup called with email:', email);

        // Clear previous errors
        setEmailError('');

        if (!email.trim()) {
            setEmailError('Please enter your email address');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        console.log('Starting signup process...');
        setIsLoading(true);

        try {
            // TODO: Send signup request to your backend
            // await sendSignupOTP(email);

            // Simulate API call
            setTimeout(() => {
                console.log('Navigation triggered');
                setIsLoading(false);
                // Navigate to OTP verification with email parameter
                if (Platform.OS === 'web') {
                    console.log('Web navigation');
                    router.push(`/(auth)/verify-otp?email=${encodeURIComponent(email)}&type=signup`);
                } else {
                    console.log('Mobile navigation');
                    router.push({
                        pathname: '/(auth)/verify-otp',
                        params: { email, type: 'signup' }
                    });
                }
            }, 1500);

        } catch (error) {
            setIsLoading(false);
            Alert.alert('Error', 'Failed to send verification code. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardContainer}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Main Content */}
                    <View style={styles.content}>
                        {/* Header */}
                        <View style={styles.header}>
                            <LinearGradient
                                colors={['#6366f1', '#3b82f6']}
                                style={styles.iconContainer}
                            >
                                <Ionicons name="wallet" size={32} color="white" />
                            </LinearGradient>

                            <Text style={styles.title}>Create account</Text>
                            <Text style={styles.subtitle}>
                                Join RampMeDaddy and start your crypto investing journey
                            </Text>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            <Text style={styles.inputLabel}>Email address</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    emailError && styles.textInputError
                                ]}
                                placeholder="Enter your email"
                                placeholderTextColor="#9ca3af"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (emailError) setEmailError('');
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="email"
                                editable={!isLoading}
                            />

                            {emailError && (
                                <View style={styles.errorContainer}>
                                    <Ionicons name="alert-circle" size={16} color="#dc2626" />
                                    <Text style={styles.errorText}>{emailError}</Text>
                                </View>
                            )}

                            <TouchableOpacity
                                onPress={() => {
                                    console.log('Signup button pressed with email:', email, 'isLoading:', isLoading);
                                    handleSignup();
                                }}
                                disabled={isLoading}
                                style={[
                                    styles.signupButton,
                                    isLoading && styles.signupButtonDisabled
                                ]}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <>
                                        <Text style={styles.signupButtonText}>Continue</Text>
                                        <Ionicons name="arrow-forward" size={20} color="white" />
                                    </>
                                )}
                            </TouchableOpacity>

                            <Text style={styles.helperText}>
                                We'll send you a verification code to confirm your email
                            </Text>
                        </View>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account?</Text>
                            <Link href="/(auth)/login" asChild>
                                <TouchableOpacity disabled={isLoading}>
                                    <Text style={styles.signinLink}>Sign in</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>

                    {/* Security Footer */}
                    <View style={styles.securityNote}>
                        <View style={styles.securityContainer}>
                            <View style={styles.securityHeader}>
                                <Ionicons name="shield-checkmark" size={20} color="#6366f1" />
                                <Text style={styles.securityTitle}>Secure & Fast</Text>
                            </View>
                            <Text style={styles.securityText}>
                                Get started in under 30 seconds with bank-level security
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    keyboardContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: isLargeScreen ? 'center' : 'space-between',
        paddingHorizontal: isLargeScreen ? 0 : 24,
        paddingVertical: isLargeScreen ? 40 : 20,
        minHeight: isLargeScreen ? '100%' : undefined,
    },
    content: {
        maxWidth: isLargeScreen ? 400 : '100%',
        width: '100%',
        alignSelf: 'center',
        flex: isLargeScreen ? 0 : 1,
        justifyContent: isLargeScreen ? 'center' : 'flex-start',
        paddingHorizontal: isLargeScreen ? 32 : 0,
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#171717',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#525252',
        textAlign: 'center',
        lineHeight: 24,
    },
    form: {
        marginBottom: 48,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#404040',
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 18,
        marginBottom: 8,
        color: '#171717',
    },
    textInputError: {
        borderColor: '#dc2626',
        backgroundColor: '#fef2f2',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    errorText: {
        color: '#dc2626',
        fontSize: 14,
        marginLeft: 6,
    },
    signupButton: {
        backgroundColor: '#6366f1',
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    signupButtonDisabled: {
        backgroundColor: '#d4d4d4',
    },
    signupButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        marginRight: 8,
    },
    helperText: {
        fontSize: 14,
        color: '#525252',
        textAlign: 'center',
        lineHeight: 20,
    },
    footer: {
        alignItems: 'center',
        marginBottom: isLargeScreen ? 0 : 20,
    },
    footerText: {
        color: '#525252',
        marginBottom: 8,
        fontSize: 16,
    },
    signinLink: {
        color: '#6366f1',
        fontWeight: '600',
        fontSize: 18,
    },
    securityNote: {
        paddingHorizontal: isLargeScreen ? 32 : 0,
        paddingBottom: isLargeScreen ? 0 : 20,
        marginTop: isLargeScreen ? 40 : 0,
    },
    securityContainer: {
        backgroundColor: '#f8f9ff',
        borderRadius: 12,
        padding: 16,
        alignSelf: 'center',
        width: '100%',
        maxWidth: isLargeScreen ? 400 : '100%',
    },
    securityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    securityTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#171717',
        marginLeft: 8,
    },
    securityText: {
        fontSize: 12,
        color: '#525252',
        lineHeight: 16,
    },
});
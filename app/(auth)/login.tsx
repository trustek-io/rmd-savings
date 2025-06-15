// app/(auth)/login.tsx
import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isLargeScreen = screenWidth > 768;

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showEmailLogin, setShowEmailLogin] = useState(false);
    const [biometricType, setBiometricType] = useState<string>('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        checkBiometricType();
    }, []);

    const checkBiometricType = async () => {
        if (isWeb) {
            // Check for WebAuthn support
            if (window.PublicKeyCredential) {
                setBiometricType('passkey');
            }
            return;
        }

        try {
            const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
            if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
                setBiometricType('face');
            } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
                setBiometricType('fingerprint');
            } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
                setBiometricType('iris');
            }
        } catch (error) {
            console.log('Error checking biometric type:', error);
        }
    };

    const handlePasskeyLogin = async () => {
        if (isWeb) {
            try {
                setIsLoading(true);

                // Check if WebAuthn is supported
                if (!window.PublicKeyCredential) {
                    Alert.alert('Passkeys not supported', 'Your browser does not support passkeys. Please use email login.');
                    setShowEmailLogin(true);
                    return;
                }

                // Create credential request options
                const options: CredentialRequestOptions = {
                    publicKey: {
                        challenge: new Uint8Array(32),
                        timeout: 60000,
                        userVerification: 'required',
                        rpId: window.location.hostname,
                    }
                };

                // Request credential
                const credential = await navigator.credentials.get(options) as PublicKeyCredential;

                if (credential) {
                    // TODO: Verify credential with your backend
                    Alert.alert(
                        'Success!',
                        'Passkey authentication successful',
                        [{ text: 'Continue', onPress: () => router.replace('/dashboard') }]
                    );
                }
            } catch (error: any) {
                if (error.name === 'NotAllowedError') {
                    Alert.alert('Authentication cancelled', 'Please try again.');
                } else {
                    Alert.alert('Authentication failed', 'Please try email login instead.');
                    setShowEmailLogin(true);
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            // Mobile biometric authentication
            await handleBiometricLogin();
        }
    };

    const handleBiometricLogin = async () => {
        try {
            setIsLoading(true);

            const isAvailable = await LocalAuthentication.hasHardwareAsync();
            if (!isAvailable) {
                Alert.alert('Biometric not available', 'Please use email login instead.');
                setShowEmailLogin(true);
                return;
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (!isEnrolled) {
                Alert.alert('No biometric enrolled', 'Please set up biometric authentication in your device settings.');
                return;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Sign in to RampMeDaddy',
                fallbackLabel: 'Use Email',
                cancelLabel: 'Cancel',
                requireConfirmation: false,
                disableDeviceFallback: false,
            });

            if (result.success) {
                Alert.alert(
                    'Success!',
                    'Biometric authentication successful',
                    [{ text: 'Continue', onPress: () => router.replace('/dashboard') }]
                );
            }
        } catch (error) {
            Alert.alert('Authentication failed', 'Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailLogin = async () => {
        console.log('Email login clicked with email:', email);

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

        console.log('Starting email login process...');
        setIsLoading(true);

        setTimeout(() => {
            console.log('Email login navigation triggered');
            setIsLoading(false);

            // Navigate directly without Alert on web
            if (Platform.OS === 'web') {
                console.log('Direct web navigation to OTP');
                router.push(`/(auth)/verify-otp?email=${encodeURIComponent(email)}&type=login`);
            } else {
                Alert.alert(
                    'OTP Sent',
                    'Check your email for the verification code.',
                    [{
                        text: 'Continue',
                        onPress: () => {
                            console.log('Navigating to OTP screen...');
                            router.push({
                                pathname: '/(auth)/verify-otp',
                                params: { email, type: 'login' }
                            });
                        }
                    }]
                );
            }
        }, 1000);
    };

    const getBiometricIcon = () => {
        if (isWeb) return 'key';
        switch (biometricType) {
            case 'face': return 'scan';
            case 'fingerprint': return 'finger-print';
            case 'iris': return 'eye';
            default: return 'finger-print';
        }
    };

    const getBiometricText = () => {
        if (isWeb) return 'Sign in with passkey';
        switch (biometricType) {
            case 'face': return 'Sign in with Face ID';
            case 'fingerprint': return 'Sign in with fingerprint';
            case 'iris': return 'Sign in with iris scan';
            default: return 'Sign in with biometrics';
        }
    };

    const containerStyle = isLargeScreen ?
        [styles.container, styles.webContainer] :
        styles.container;

    const contentStyle = isLargeScreen ?
        [styles.content, styles.webContent] :
        styles.content;

    return (
        <SafeAreaView style={containerStyle}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardContainer}
            >
                {isLargeScreen && <View style={styles.webSpacer} />}
                <View style={contentStyle}>
                    {/* Header */}
                    <View style={styles.header}>
                        <LinearGradient
                            colors={['#6366f1', '#3b82f6']}
                            style={styles.iconContainer}
                        >
                            <Ionicons name="wallet" size={32} color="white" />
                        </LinearGradient>

                        <Text style={styles.title}>Welcome back</Text>
                        <Text style={styles.subtitle}>
                            Sign in to your RampMeDaddy account
                        </Text>
                    </View>

                    {/* Biometric/Passkey Login Button */}
                    {!showEmailLogin && (biometricType || isWeb) && (
                        <View style={styles.biometricSection}>
                            <TouchableOpacity
                                onPress={handlePasskeyLogin}
                                disabled={isLoading}
                                style={styles.biometricButton}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <>
                                        <Ionicons name={getBiometricIcon()} size={24} color="white" />
                                        <Text style={styles.biometricButtonText}>
                                            {getBiometricText()}
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setShowEmailLogin(true)}
                                style={styles.switchButton}
                            >
                                <Text style={styles.switchButtonText}>
                                    Use email instead
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Email Login Form */}
                    {(showEmailLogin || (!biometricType && !isWeb)) && (
                        <View style={styles.emailSection}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <TextInput
                                value={email}
                                onChangeText={(value) => {
                                    setEmail(value);
                                    // Clear error when user starts typing
                                    if (emailError) setEmailError('');
                                }}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={[
                                    styles.textInput,
                                    emailError && styles.textInputError
                                ]}
                            />

                            {emailError ? (
                                <View style={styles.errorContainer}>
                                    <Ionicons name="alert-circle" size={16} color="#dc2626" />
                                    <Text style={styles.errorText}>{emailError}</Text>
                                </View>
                            ) : null}

                            <TouchableOpacity
                                onPress={() => {
                                    console.log('Email send verification button clicked!');
                                    handleEmailLogin();
                                }}
                                disabled={isLoading}
                                style={styles.emailButton}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <>
                                        <Ionicons name="mail" size={20} color="white" />
                                        <Text style={styles.emailButtonText}>
                                            Send verification code
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>

                            {(biometricType || isWeb) && (
                                <TouchableOpacity
                                    onPress={() => setShowEmailLogin(false)}
                                    style={styles.switchButton}
                                >
                                    <Text style={styles.switchButtonText}>
                                        Back to {isWeb ? 'passkey' : 'biometric'} login
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <Link href="/(auth)/signup" asChild>
                            <TouchableOpacity>
                                <Text style={styles.signupLink}>Sign up for free</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
                {isLargeScreen && <View style={styles.webSpacer} />}

                {/* Bottom Security Note */}
                <View style={styles.securityNote}>
                    <View style={styles.securityContainer}>
                        <Ionicons name="shield-checkmark" size={20} color="#6366f1" />
                        <Text style={styles.securityText}>
                            Your data is encrypted and secured with bank-level security
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    webContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 60,
    },
    keyboardContainer: {
        flex: 1,
        width: '100%',
        alignItems: isLargeScreen ? 'center' : 'stretch',
    },
    webSpacer: {
        flex: 0.3,
    },
    content: {
        flex: isLargeScreen ? 0 : 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        width: '100%',
    },
    webContent: {
        maxWidth: 400,
        width: '100%',
        paddingHorizontal: 32,
        alignSelf: 'center',
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
    },
    subtitle: {
        fontSize: 18,
        color: '#525252',
        textAlign: 'center',
    },
    biometricSection: {
        marginBottom: 32,
    },
    biometricButton: {
        backgroundColor: '#6366f1',
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    biometricButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 12,
    },
    emailSection: {
        marginBottom: 32,
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
    emailButton: {
        backgroundColor: '#6366f1',
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    emailButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 8,
    },
    switchButton: {
        paddingVertical: 12,
    },
    switchButtonText: {
        color: '#6366f1',
        fontWeight: '500',
        textAlign: 'center',
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        color: '#525252',
        marginBottom: 8,
    },
    signupLink: {
        color: '#6366f1',
        fontWeight: '600',
        fontSize: 18,
    },
    securityNote: {
        paddingHorizontal: isLargeScreen ? 32 : 24,
        paddingBottom: 24,
    },
    securityContainer: {
        backgroundColor: '#fafafa',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: isLargeScreen ? 400 : '100%',
        alignSelf: 'center',
    },
    securityText: {
        fontSize: 14,
        color: '#525252',
        marginLeft: 12,
        flex: 1,
    },
});
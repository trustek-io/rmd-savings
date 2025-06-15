// app/(auth)/verify-otp.tsx - FIXED VERSION
import React, { useState, useRef, useEffect } from 'react';
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
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;

export default function VerifyOTPScreen() {
    const { email, type } = useLocalSearchParams();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const inputRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleOtpChange = (text: string, index: number) => {
        if (text.length > 1) {
            // Handle paste
            const pastedOtp = text.slice(0, 6).split('');
            const newOtp = [...otp];
            pastedOtp.forEach((char, i) => {
                if (index + i < 6) {
                    newOtp[index + i] = char;
                }
            });
            setOtp(newOtp);

            // Focus last filled input or next empty
            const nextIndex = Math.min(index + pastedOtp.length, 5);
            inputRefs.current[nextIndex]?.focus();
        } else {
            // Single character input
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);

            // Auto focus next input
            if (text && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = async () => {
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            Alert.alert('Invalid code', 'Please enter the complete 6-digit verification code.');
            return;
        }

        console.log('OTP verification starting...');
        setIsLoading(true);

        try {
            // TODO: Verify OTP with your backend
            // await verifyOTP(email, otpCode, type);

            // Simulate API call
            setTimeout(() => {
                console.log('OTP verification complete, navigating...');
                setIsLoading(false);

                if (type === 'signup') {
                    console.log('Signup flow - showing welcome alert');
                    if (Platform.OS === 'web') {
                        // Direct navigation on web
                        router.replace('/dashboard');
                    } else {
                        Alert.alert(
                            'Welcome!',
                            'Your account has been created successfully.',
                            [{ text: 'Continue', onPress: () => {
                                    console.log('Navigating to dashboard...');
                                    router.replace('/dashboard');
                                }}]
                        );
                    }
                } else {
                    // Login flow
                    console.log('Login flow - going to dashboard');
                    router.replace('/dashboard');
                }
            }, 1500);

        } catch (error) {
            console.log('OTP verification error:', error);
            setIsLoading(false);
            Alert.alert('Invalid code', 'The verification code is incorrect. Please try again.');
            // Clear OTP inputs
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }
    };

    const handleResendOTP = async () => {
        setIsResending(true);

        try {
            // TODO: Resend OTP via your backend
            // await resendOTP(email);

            // Simulate API call
            setTimeout(() => {
                setIsResending(false);
                setCanResend(false);
                setCountdown(30);
                Alert.alert('Code sent', 'A new verification code has been sent to your email.');

                // Reset countdown
                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            setCanResend(true);
                            clearInterval(timer);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }, 1000);

        } catch (error) {
            setIsResending(false);
            Alert.alert('Error', 'Failed to resend code. Please try again.');
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
                        {/* Back Button */}
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color="#6366f1" />
                        </TouchableOpacity>

                        {/* Header */}
                        <View style={styles.header}>
                            <LinearGradient
                                colors={['#6366f1', '#3b82f6']}
                                style={styles.iconContainer}
                            >
                                <Ionicons name="mail" size={32} color="white" />
                            </LinearGradient>

                            <Text style={styles.title}>Check your email</Text>
                            <Text style={styles.subtitle}>
                                We sent a verification code to{'\n'}
                                <Text style={styles.email}>{email}</Text>
                            </Text>
                        </View>

                        {/* OTP Input */}
                        <View style={styles.otpContainer}>
                            <Text style={styles.inputLabel}>Enter verification code</Text>

                            <View style={styles.otpInputs}>
                                {otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        ref={(ref) => inputRefs.current[index] = ref}
                                        style={[
                                            styles.otpInput,
                                            digit && styles.otpInputFilled,
                                            isLoading && styles.otpInputDisabled
                                        ]}
                                        value={digit}
                                        onChangeText={(text) => handleOtpChange(text, index)}
                                        onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                                        keyboardType="number-pad"
                                        maxLength={6} // Allow paste
                                        selectTextOnFocus
                                        editable={!isLoading}
                                        autoComplete="one-time-code"
                                    />
                                ))}
                            </View>

                            <TouchableOpacity
                                onPress={handleVerifyOTP}
                                disabled={isLoading || otp.join('').length !== 6}
                                style={[
                                    styles.verifyButton,
                                    (isLoading || otp.join('').length !== 6) && styles.verifyButtonDisabled
                                ]}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <>
                                        <Text style={styles.verifyButtonText}>Verify Code</Text>
                                        <Ionicons name="checkmark" size={20} color="white" />
                                    </>
                                )}
                            </TouchableOpacity>

                            {/* Resend Section */}
                            <View style={styles.resendContainer}>
                                {canResend ? (
                                    <TouchableOpacity
                                        onPress={handleResendOTP}
                                        disabled={isResending}
                                        style={styles.resendButton}
                                    >
                                        <Text style={styles.resendText}>
                                            {isResending ? 'Sending...' : 'Resend code'}
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <Text style={styles.countdownText}>
                                        Resend code in {countdown}s
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Security Footer */}
                    <View style={styles.securityNote}>
                        <View style={styles.securityContainer}>
                            <Ionicons name="shield-checkmark" size={16} color="#6366f1" />
                            <Text style={styles.securityText}>
                                Your verification code expires in 10 minutes
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
        paddingVertical: isLargeScreen ? 60 : 20, // More top padding for web
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
    backButton: {
        alignSelf: 'flex-start',
        padding: 8,
        marginBottom: 24,
        marginLeft: isLargeScreen ? -8 : 0,
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
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#525252',
        textAlign: 'center',
        lineHeight: 22,
    },
    email: {
        fontWeight: '600',
        color: '#6366f1',
    },
    otpContainer: {
        marginBottom: 32,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#404040',
        marginBottom: 12,
        textAlign: 'center',
    },
    otpInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
        gap: isLargeScreen ? 12 : 8,
    },
    otpInput: {
        flex: 1,
        height: 56,
        borderWidth: 2,
        borderColor: '#e5e5e5',
        borderRadius: 12,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#fafafa',
        color: '#171717',
    },
    otpInputFilled: {
        borderColor: '#6366f1',
        backgroundColor: '#f8f9ff',
    },
    otpInputDisabled: {
        opacity: 0.6,
    },
    verifyButton: {
        backgroundColor: '#6366f1',
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    verifyButtonDisabled: {
        backgroundColor: '#d4d4d4',
    },
    verifyButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        marginRight: 8,
    },
    resendContainer: {
        alignItems: 'center',
        minHeight: 24,
        marginBottom: 32,
    },
    resendButton: {
        padding: 8,
    },
    resendText: {
        color: '#6366f1',
        fontWeight: '500',
        fontSize: 16,
    },
    countdownText: {
        color: '#525252',
        fontSize: 14,
    },
    securityNote: {
        paddingHorizontal: isLargeScreen ? 32 : 0,
        paddingBottom: isLargeScreen ? 0 : 20,
        marginTop: isLargeScreen ? 40 : 0,
    },
    securityContainer: {
        backgroundColor: '#f8f9ff',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: isLargeScreen ? 400 : '100%',
        alignSelf: 'center',
        width: '100%',
    },
    securityText: {
        fontSize: 12,
        color: '#525252',
        marginLeft: 8,
    },
});
// app/kyc/personal-info.tsx
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;

export default function KYCPersonalInfoScreen() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    // Use refs to avoid re-render issues
    const formRefs = useRef({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        ssn: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
    });

    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const data = formRefs.current;

        if (!data.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!data.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!data.dateOfBirth.trim()) {
            newErrors.dateOfBirth = 'Date of birth is required';
        }
        if (!data.ssn.trim()) {
            newErrors.ssn = 'SSN is required';
        } else if (data.ssn.replace(/\D/g, '').length !== 9) {
            newErrors.ssn = 'SSN must be 9 digits';
        }
        if (!data.address.trim()) {
            newErrors.address = 'Address is required';
        }
        if (!data.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!data.state.trim()) {
            newErrors.state = 'State is required';
        }
        if (!data.zipCode.trim()) {
            newErrors.zipCode = 'ZIP code is required';
        }
        if (!data.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = async () => {
        if (!validateForm()) {
            Alert.alert('Please fill in all required fields');
            return;
        }

        setIsLoading(true);
        // TODO: Submit personal info to your backend
        setTimeout(() => {
            setIsLoading(false);
            router.push('/kyc/id-upload');
        }, 1000);
    };

    const InputField = ({
                            label,
                            field,
                            placeholder,
                            keyboardType = 'default',
                            secureTextEntry = false,
                            defaultValue = '',
                        }: {
        label: string;
        field: string;
        placeholder: string;
        keyboardType?: any;
        secureTextEntry?: boolean;
        defaultValue?: string;
    }) => {

        return (
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{label}</Text>
                <TextInput
                    style={[styles.textInput, errors[field] && styles.textInputError]}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChangeText={(value) => {
                        formRefs.current[field as keyof typeof formRefs.current] = value;
                        clearError(field);
                    }}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    autoCorrect={false}
                    autoCapitalize={field === 'firstName' || field === 'lastName' || field === 'city' ? 'words' : 'none'}
                />
                {errors[field] && (
                    <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle" size={16} color="#dc2626" />
                        <Text style={styles.errorText}>{errors[field]}</Text>
                    </View>
                )}
            </View>
        );
    };

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
                    <Text style={styles.title}>Personal Information</Text>
                    <Text style={styles.subtitle}>
                        Please provide your personal details exactly as they appear on your government-issued ID.
                    </Text>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Name Row */}
                        <View style={styles.nameRow}>
                            <View style={styles.nameField}>
                                <InputField
                                    label="First Name"
                                    field="firstName"
                                    placeholder="John"
                                />
                            </View>
                            <View style={styles.nameField}>
                                <InputField
                                    label="Last Name"
                                    field="lastName"
                                    placeholder="Doe"
                                />
                            </View>
                        </View>

                        <InputField
                            label="Date of Birth"
                            field="dateOfBirth"
                            placeholder="MM/DD/YYYY"
                            keyboardType="numeric"
                        />

                        <InputField
                            label="Social Security Number"
                            field="ssn"
                            placeholder="123456789"
                            keyboardType="numeric"
                            secureTextEntry={true}
                        />

                        <InputField
                            label="Street Address"
                            field="address"
                            placeholder="123 Main Street"
                        />

                        {/* Address Row */}
                        <View style={styles.addressRow}>
                            <View style={styles.cityField}>
                                <InputField
                                    label="City"
                                    field="city"
                                    placeholder="New York"
                                />
                            </View>
                            <View style={styles.stateField}>
                                <InputField
                                    label="State"
                                    field="state"
                                    placeholder="NY"
                                />
                            </View>
                            <View style={styles.zipField}>
                                <InputField
                                    label="ZIP Code"
                                    field="zipCode"
                                    placeholder="10001"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <InputField
                            label="Phone Number"
                            field="phoneNumber"
                            placeholder="5551234567"
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Security Note */}
                    <View style={styles.securityNote}>
                        <Ionicons name="shield-checkmark" size={16} color="#059669" />
                        <Text style={styles.securityText}>
                            Your personal information is encrypted and secured. We use this information
                            only for identity verification as required by financial regulations.
                        </Text>
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleContinue}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Text style={styles.continueButtonText}>Processing...</Text>
                        ) : (
                            <>
                                <Text style={styles.continueButtonText}>Continue</Text>
                                <Ionicons name="arrow-forward" size={20} color="white" />
                            </>
                        )}
                    </TouchableOpacity>
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
    form: {
        width: '100%',
        marginBottom: 24,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
    },
    textInputError: {
        borderColor: '#dc2626',
        backgroundColor: '#fef2f2',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    errorText: {
        color: '#dc2626',
        fontSize: 12,
        marginLeft: 6,
    },
    nameRow: {
        flexDirection: 'row',
        gap: 16,
    },
    nameField: {
        flex: 1,
    },
    addressRow: {
        flexDirection: 'row',
        gap: 12,
    },
    cityField: {
        flex: 2,
    },
    stateField: {
        flex: 1,
    },
    zipField: {
        flex: 1,
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ecfdf5',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        marginBottom: 24,
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
        marginBottom: isLargeScreen ? 0 : 24,
    },
    continueButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        marginRight: 8,
    },
});
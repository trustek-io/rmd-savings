// app/kyc/id-upload.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform,
    Alert,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;
const isWeb = Platform.OS === 'web';

interface UploadedImage {
    uri: string;
    type: string;
}

export default function KYCIdUploadScreen() {
    const [frontImage, setFrontImage] = useState<UploadedImage | null>(null);
    const [backImage, setBackImage] = useState<UploadedImage | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const requestCameraPermission = async () => {
        if (isWeb) return true;

        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Camera Permission Required',
                'Please enable camera access to take photos of your ID.',
                [{ text: 'OK' }]
            );
            return false;
        }
        return true;
    };

    const handleImageCapture = async (side: 'front' | 'back') => {
        try {
            if (isWeb) {
                // Web: File picker
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (event: any) => {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const imageData = {
                                uri: e.target?.result as string,
                                type: file.type,
                            };
                            if (side === 'front') {
                                setFrontImage(imageData);
                            } else {
                                setBackImage(imageData);
                            }
                        };
                        reader.readAsDataURL(file);
                    }
                };
                input.click();
            } else {
                // Mobile: Camera with guided capture
                const hasPermission = await requestCameraPermission();
                if (!hasPermission) return;

                Alert.alert(
                    `Capture ${side === 'front' ? 'Front' : 'Back'} of ID`,
                    'Position your ID within the frame and make sure all text is clearly visible.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Take Photo', onPress: () => launchCamera(side) },
                        { text: 'Choose from Library', onPress: () => launchImagePicker(side) },
                    ]
                );
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to capture image. Please try again.');
        }
    };

    const launchCamera = async (side: 'front' | 'back') => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                const imageData = {
                    uri: result.assets[0].uri,
                    type: 'image/jpeg',
                };
                if (side === 'front') {
                    setFrontImage(imageData);
                } else {
                    setBackImage(imageData);
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to take photo. Please try again.');
        }
    };

    const launchImagePicker = async (side: 'front' | 'back') => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                const imageData = {
                    uri: result.assets[0].uri,
                    type: 'image/jpeg',
                };
                if (side === 'front') {
                    setFrontImage(imageData);
                } else {
                    setBackImage(imageData);
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to select image. Please try again.');
        }
    };

    const handleContinue = async () => {
        if (!frontImage || !backImage) {
            Alert.alert('Missing Images', 'Please upload both front and back of your ID.');
            return;
        }

        setIsLoading(true);
        // TODO: Upload images to your backend
        setTimeout(() => {
            setIsLoading(false);
            router.push('/kyc/review');
        }, 2000);
    };

    const UploadBox = ({
                           side,
                           image,
                           onPress
                       }: {
        side: 'front' | 'back';
        image: UploadedImage | null;
        onPress: () => void;
    }) => (
        <TouchableOpacity style={styles.uploadBox} onPress={onPress}>
            {image ? (
                <View style={styles.imagePreview}>
                    <Image source={{ uri: image.uri }} style={styles.previewImage} />
                    <View style={styles.imageOverlay}>
                        <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                        <Text style={styles.imageSuccess}>
                            {side === 'front' ? 'Front' : 'Back'} uploaded
                        </Text>
                    </View>
                </View>
            ) : (
                <View style={styles.uploadPrompt}>
                    <View style={styles.idOutline}>
                        <Ionicons name="card-outline" size={48} color="#d1d5db" />
                    </View>
                    <Text style={styles.uploadTitle}>
                        {side === 'front' ? 'Front of ID' : 'Back of ID'}
                    </Text>
                    <Text style={styles.uploadDescription}>
                        {isWeb ? 'Click to upload' : 'Tap to capture'}
                    </Text>
                    <View style={styles.uploadButton}>
                        <Ionicons
                            name={isWeb ? "cloud-upload-outline" : "camera-outline"}
                            size={20}
                            color="#6366f1"
                        />
                        <Text style={styles.uploadButtonText}>
                            {isWeb ? 'Upload Image' : 'Take Photo'}
                        </Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
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
                    >
                        <Ionicons name="arrow-back" size={24} color="#6366f1" />
                    </TouchableOpacity>

                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '66%' }]} />
                        </View>
                        <Text style={styles.progressText}>Step 2 of 3</Text>
                    </View>
                </View>

                {/* Main Content */}
                <View style={styles.mainContent}>
                    <Text style={styles.title}>Upload Your ID</Text>
                    <Text style={styles.subtitle}>
                        Take clear photos of both sides of your government-issued ID.
                        Make sure all text is visible and not blurry.
                    </Text>

                    {/* Upload Boxes */}
                    <View style={styles.uploadContainer}>
                        <UploadBox
                            side="front"
                            image={frontImage}
                            onPress={() => handleImageCapture('front')}
                        />
                        <UploadBox
                            side="back"
                            image={backImage}
                            onPress={() => handleImageCapture('back')}
                        />
                    </View>

                    {/* Tips */}
                    <View style={styles.tipsContainer}>
                        <Text style={styles.tipsTitle}>Tips for best results:</Text>
                        <View style={styles.tipsList}>
                            <View style={styles.tipItem}>
                                <Ionicons name="checkmark-circle-outline" size={16} color="#10b981" />
                                <Text style={styles.tipText}>Good lighting, avoid shadows</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <Ionicons name="checkmark-circle-outline" size={16} color="#10b981" />
                                <Text style={styles.tipText}>All corners of ID visible</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <Ionicons name="checkmark-circle-outline" size={16} color="#10b981" />
                                <Text style={styles.tipText}>Text is clear and readable</Text>
                            </View>
                            <View style={styles.tipItem}>
                                <Ionicons name="checkmark-circle-outline" size={16} color="#10b981" />
                                <Text style={styles.tipText}>No glare or reflections</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        (!frontImage || !backImage) && styles.continueButtonDisabled
                    ]}
                    onPress={handleContinue}
                    disabled={!frontImage || !backImage || isLoading}
                >
                    {isLoading ? (
                        <Text style={styles.continueButtonText}>Uploading...</Text>
                    ) : (
                        <>
                            <Text style={styles.continueButtonText}>Continue</Text>
                            <Ionicons name="arrow-forward" size={20} color="white" />
                        </>
                    )}
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
    uploadContainer: {
        width: '100%',
        flexDirection: isLargeScreen ? 'row' : 'column',
        gap: 16,
        marginBottom: 32,
    },
    uploadBox: {
        flex: 1,
        minHeight: 200,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 12,
        backgroundColor: '#fafafa',
        overflow: 'hidden',
    },
    imagePreview: {
        flex: 1,
        position: 'relative',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 12,
        alignItems: 'center',
    },
    imageSuccess: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4,
    },
    uploadPrompt: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    idOutline: {
        width: 80,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    uploadTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 8,
    },
    uploadDescription: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 16,
        textAlign: 'center',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    uploadButtonText: {
        fontSize: 14,
        color: '#6366f1',
        fontWeight: '500',
        marginLeft: 6,
    },
    tipsContainer: {
        width: '100%',
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 20,
    },
    tipsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 12,
    },
    tipsList: {
        gap: 8,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tipText: {
        fontSize: 14,
        color: '#6b7280',
        marginLeft: 8,
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
    continueButtonDisabled: {
        backgroundColor: '#d1d5db',
    },
    continueButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        marginRight: 8,
    },
});
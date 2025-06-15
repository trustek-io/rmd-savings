import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#6366f1', '#3b82f6']}
                style={styles.iconContainer}
            >
                <Ionicons name="wallet" size={32} color="white" />
            </LinearGradient>

            <Text style={styles.title}>Welcome to RampMeDaddy</Text>
            <Text style={styles.subtitle}>
                AI-powered crypto micro-investing made simple
            </Text>

            <Link href="/(auth)/login" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Get Started</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
        paddingHorizontal: 24,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#171717',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#525252',
        marginBottom: 48,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6366f1',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        marginRight: 8,
    },
});
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function OverviewScreen() {
    useEffect(() => {
        // Redirect to dashboard immediately
        router.replace('/dashboard');
    }, []);

    return null;
}
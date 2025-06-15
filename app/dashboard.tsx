// app/dashboard.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DonutChart from '../components/DonutChart';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;

// Sample activity data
const activityData = [
    {
        id: 1,
        date: 'Jun 14',
        type: 'Weekly Auto-Invest',
        description: 'Auto-invest from Chase Bank ••••8274',
        amount: '$143.55',
        color: '#14b8a6',
        details: {
            breakdown: [
                { name: 'Bitcoin', symbol: 'BTC', shares: '0.00218', price: '$67,425.00', amount: '$147.00' },
                { name: 'Ethereum', symbol: 'ETH', shares: '0.02891', price: '$3,456.00', amount: '$99.90' },
                { name: 'Solana', symbol: 'SOL', shares: '0.7234', price: '$138.50', amount: '$100.20' },
            ]
        }
    },
    {
        id: 2,
        date: 'Jun 13',
        type: 'Staking Rewards',
        description: 'Ethereum staking rewards earned',
        amount: '$12.34',
        color: '#8b5cf6',
    },
    {
        id: 3,
        date: 'Jun 12',
        type: 'Manual Deposit',
        description: 'Manual deposit from savings account',
        amount: '$500.00',
        color: '#06b6d4',
    },
];

// Portfolio data with colors for chart
const portfolioData = [
    { name: 'Bitcoin', symbol: 'BTC', percentage: 42, amount: '$20,948.40', color: '#f97316' },
    { name: 'Ethereum', symbol: 'ETH', percentage: 28, amount: '$13,965.47', color: '#8b5cf6' },
    { name: 'Solana', symbol: 'SOL', percentage: 18, amount: '$8,977.80', color: '#06b6d4' },
    { name: 'USDC', symbol: 'USDC', percentage: 12, amount: '$5,984.00', color: '#10b981' },
];

export default function Dashboard() {
    const router = useRouter();
    const [expandedActivity, setExpandedActivity] = useState(null);
    const [isKYCRequired, setIsKYCRequired] = useState(true); // Set to true to show KYC banner

    const handleActivityToggle = (activityId) => {
        setExpandedActivity(expandedActivity === activityId ? null : activityId);
    };

    const containerStyle = isLargeScreen ? [styles.container, styles.webContainer] : styles.container;
    const scrollContentStyle = isLargeScreen ? styles.webScrollContent : styles.mobileScrollContent;

    return (
        <SafeAreaView style={containerStyle} edges={['top']}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={scrollContentStyle}
                showsVerticalScrollIndicator={false}
            >
                {/* KYC Security Banner */}
                {isKYCRequired && (
                    <View style={styles.securityBanner}>
                        <View style={styles.securityIconContainer}>
                            <Ionicons name="document-text" size={24} color="#0f172a" />
                        </View>
                        <View style={styles.securityContent}>
                            <Text style={styles.securityTitle}>Finish Setup</Text>
                            <Text style={styles.securityDescription}>
                                Complete your application and identity verification to start investing in crypto.
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.startButton}
                            onPress={() => router.push('/kyc/start')}
                        >
                            <Text style={styles.startButtonText}>Start</Text>
                            <Ionicons name="arrow-forward" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Hero Section */}
                <LinearGradient
                    colors={['#0f766e', '#14b8a6']}
                    style={styles.heroSection}
                >
                    <View style={styles.accountInfo}>
                        <Text style={styles.accountNumber}>ACCOUNT #RMD7C8FLDV</Text>
                        <Text style={styles.accountType}>RampMeDaddy Crypto Portfolio</Text>
                    </View>

                    <View style={styles.balanceSection}>
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <Text style={styles.balanceAmount}>$49,876.67</Text>
                        <Text style={styles.balanceDate}>as of 06/15/2025</Text>
                    </View>
                </LinearGradient>

                {/* Performance Section */}
                <View style={styles.performanceCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Performance</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewMoreLink}>View More</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.performanceGrid}>
                        <View style={styles.performanceItem}>
                            <Text style={styles.performanceValue}>$10,072.11</Text>
                            <Text style={styles.performanceLabel}>Change in Value</Text>
                            <Text style={styles.performanceDescription}>
                                Reflects the inception to date change in market value of your
                                portfolio. Includes rewards and the deduction of fees.
                            </Text>
                        </View>

                        <View style={styles.performanceItem}>
                            <Text style={styles.performanceValue}>40.73%</Text>
                            <View style={styles.returnHeader}>
                                <Text style={styles.performanceLabel}>Personal Rate of Return</Text>
                                <Ionicons name="information-circle-outline" size={16} color="#6b7280" />
                            </View>
                            <View style={styles.cumulativeContainer}>
                                <Text style={styles.cumulativeText}>Cumulative</Text>
                                <Ionicons name="chevron-down" size={16} color="#6b7280" />
                            </View>
                            <Text style={styles.performanceDescription}>
                                Reflects the cumulative return of your underlying portfolio
                                since you started using RampMeDaddy.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Bottom Grid */}
                <View style={styles.bottomGrid}>
                    {/* Contributions */}
                    <View style={styles.contributionsCard}>
                        <Text style={styles.cardTitle}>Auto-Invest</Text>

                        <View style={styles.contributionGrid}>
                            <View style={styles.contributionItem}>
                                <Text style={styles.contributionPercentage}>15%</Text>
                                <Text style={styles.contributionLabel}>Weekly (Automated)</Text>
                                <Text style={styles.contributionAmount}>$574.20</Text>
                                <Text style={styles.contributionSubtext}>2025 Auto-Investment</Text>
                            </View>

                            <View style={styles.contributionItem}>
                                <Text style={styles.contributionPercentage}>5%</Text>
                                <Text style={styles.contributionLabel}>Manual Deposits</Text>
                                <Text style={styles.contributionAmount}>$1,388.22</Text>
                                <Text style={styles.contributionSubtext}>2025 Manual Deposits</Text>
                            </View>
                        </View>

                        <View style={styles.infoContainer}>
                            <Ionicons name="information-circle" size={16} color="#3b82f6" />
                            <Text style={styles.infoText}>
                                Your auto-invest is connected to your bank account for weekly deposits.
                            </Text>
                        </View>
                    </View>

                    {/* Portfolio */}
                    <View style={styles.portfolioCard}>
                        <Text style={styles.cardTitle}>Portfolio</Text>

                        <View style={styles.portfolioContent}>
                            <View style={styles.chartSection}>
                                <DonutChart />
                            </View>

                            <View style={styles.breakdownSection}>
                                <View style={styles.breakdownHeader}>
                                    <Text style={styles.breakdownTitle}>Current Breakdown</Text>
                                    <Ionicons name="information-circle-outline" size={16} color="#6b7280" />
                                </View>

                                {portfolioData.map((item, index) => (
                                    <View key={index} style={styles.portfolioItem}>
                                        <View style={styles.portfolioItemLeft}>
                                            <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                                            <Text style={styles.portfolioPercentage}>{item.percentage}%</Text>
                                            <Text style={styles.portfolioName}>{item.name}</Text>
                                            <Text style={styles.portfolioSymbol}>{item.symbol}</Text>
                                        </View>
                                        <Text style={styles.portfolioAmount}>{item.amount}</Text>
                                    </View>
                                ))}

                                <View style={styles.targetSection}>
                                    <Text style={styles.targetTitle}>Target Portfolio</Text>
                                    <Text style={styles.targetItem}>45% <Text style={styles.targetName}>Bitcoin</Text></Text>
                                    <Text style={styles.targetItem}>30% <Text style={styles.targetName}>Ethereum</Text></Text>
                                    <Text style={styles.targetItem}>15% <Text style={styles.targetName}>Solana</Text></Text>
                                    <Text style={styles.targetItem}>10% <Text style={styles.targetName}>Stablecoin</Text></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Activity Section */}
                <View style={styles.activityCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Activity</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewMoreLink}>View More</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.activityContent}>
                        {activityData.map((activity) => (
                            <View key={activity.id} style={styles.activityItem}>
                                {/* Main Activity Row */}
                                <View style={styles.activityRow}>
                                    <Text style={styles.activityDate}>{activity.date}</Text>

                                    <View style={styles.activityInfo}>
                                        <View style={[styles.activityColorBar, { backgroundColor: activity.color }]} />
                                        <View style={styles.activityMainContent}>
                                            <TouchableOpacity
                                                style={styles.activityHeader}
                                                onPress={() => activity.details && handleActivityToggle(activity.id)}
                                            >
                                                <View style={styles.activityTitleRow}>
                                                    <Text style={styles.activityType}>{activity.type}</Text>
                                                    {activity.details && (
                                                        <Ionicons
                                                            name={expandedActivity === activity.id ? "chevron-up" : "chevron-down"}
                                                            size={16}
                                                            color="#6b7280"
                                                        />
                                                    )}
                                                </View>
                                                <Text style={styles.activityDescription}>{activity.description}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {activity.amount && (
                                            <Text style={[
                                                styles.activityAmount,
                                                activity.amount.startsWith('-') && styles.negativeAmount
                                            ]}>
                                                {activity.amount}
                                            </Text>
                                        )}
                                    </View>
                                </View>

                                {/* Expanded Details */}
                                {expandedActivity === activity.id && activity.details && (
                                    <View style={styles.activityDetails}>
                                        <View style={styles.contributionSummary}>
                                            <Text style={styles.detailsTitle}>AUTO-INVEST BREAKDOWN</Text>

                                            <View style={styles.contributionRow}>
                                                <View style={styles.contributionColumn}>
                                                    <Text style={styles.contributionLabel}>Asset</Text>
                                                    <Text style={styles.contributionLabel}>Shares</Text>
                                                    <Text style={styles.contributionLabel}>Price</Text>
                                                    <Text style={styles.contributionLabel}>Amount</Text>
                                                </View>
                                            </View>

                                            {activity.details.breakdown.map((item, index) => (
                                                <View key={index} style={styles.cryptoRow}>
                                                    <View style={styles.cryptoName}>
                                                        <Text style={styles.cryptoText}>{item.name}</Text>
                                                        <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
                                                    </View>
                                                    <Text style={styles.cryptoShares}>{item.shares}</Text>
                                                    <Text style={styles.cryptoPrice}>{item.price}</Text>
                                                    <Text style={styles.cryptoAmount}>{item.amount}</Text>
                                                </View>
                                            ))}

                                            <View style={styles.subtotalRow}>
                                                <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
                                                <Text style={styles.subtotalAmount}>$347.10</Text>
                                            </View>
                                        </View>

                                        {/* Employer Match Section */}
                                        <View style={styles.employerSection}>
                                            <Text style={styles.detailsTitle}>EMPLOYER MATCH</Text>

                                            {activity.details.breakdown.map((item, index) => {
                                                const employerShares = (parseFloat(item.shares) * 0.67).toFixed(5);
                                                const employerAmount = (parseFloat(item.amount.replace('$', '')) * 0.67).toFixed(2);

                                                return (
                                                    <View key={index} style={styles.cryptoRow}>
                                                        <View style={styles.cryptoName}>
                                                            <Text style={styles.cryptoText}>{item.name}</Text>
                                                            <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
                                                        </View>
                                                        <Text style={styles.cryptoShares}>{employerShares}</Text>
                                                        <Text style={styles.cryptoPrice}>{item.price}</Text>
                                                        <Text style={styles.cryptoAmount}>${employerAmount}</Text>
                                                    </View>
                                                );
                                            })}

                                            <View style={styles.subtotalRow}>
                                                <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
                                                <Text style={styles.subtotalAmount}>$232.56</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>


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
    scrollView: {
        flex: 1,
    },
    webScrollContent: {
        padding: isLargeScreen ? 32 : 24,
    },
    mobileScrollContent: {
        padding: 24,
        paddingBottom: 100, // Space for bottom navigation
    },
    securityBanner: {
        backgroundColor: '#e0f2fe',
        borderRadius: 12,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    securityIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#0f172a',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    securityContent: {
        flex: 1,
    },
    securityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 4,
    },
    securityDescription: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },
    startButton: {
        backgroundColor: '#14b8a6',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    startButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
        marginRight: 6,
    },
    heroSection: {
        borderRadius: 12,
        padding: 32,
        marginBottom: 24,
    },
    accountInfo: {
        marginBottom: 32,
    },
    accountNumber: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '600',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    accountType: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
    },
    balanceSection: {
        alignItems: 'flex-start',
    },
    balanceLabel: {
        fontSize: 20,
        color: 'white',
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    balanceDate: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
    },
    performanceCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
    },
    viewMoreLink: {
        fontSize: 14,
        color: '#14b8a6',
        fontWeight: '500',
    },
    performanceGrid: {
        flexDirection: isLargeScreen ? 'row' : 'column',
        gap: 32,
    },
    performanceItem: {
        flex: 1,
    },
    performanceValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 8,
    },
    performanceLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 8,
    },
    returnHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    cumulativeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    cumulativeText: {
        fontSize: 14,
        color: '#6b7280',
        marginRight: 4,
    },
    performanceDescription: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
    },
    bottomGrid: {
        flexDirection: isLargeScreen ? 'row' : 'column',
        gap: 24,
        marginBottom: 24,
    },
    contributionsCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        flex: 1,
    },
    contributionGrid: {
        flexDirection: 'row',
        gap: 24,
        marginBottom: 20,
    },
    contributionItem: {
        flex: 1,
    },
    contributionPercentage: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 4,
    },
    contributionLabel: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 12,
    },
    contributionAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 4,
    },
    contributionSubtext: {
        fontSize: 12,
        color: '#6b7280',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#eff6ff',
        padding: 12,
        borderRadius: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#1e40af',
        marginLeft: 8,
        flex: 1,
    },
    portfolioCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        flex: 1,
    },
    portfolioContent: {
        flexDirection: isLargeScreen ? 'row' : 'column',
        gap: 24,
    },
    chartSection: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
    },
    breakdownSection: {
        flex: 1,
    },
    breakdownHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    breakdownTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6b7280',
        marginRight: 8,
    },
    portfolioItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingRight: 4, // Add padding to prevent overflow
    },
    portfolioItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Allow to take available space
        minWidth: 0, // Allow shrinking below content size
    },
    colorDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12,
        flexShrink: 0, // Don't shrink the color dot
    },
    portfolioPercentage: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
        marginRight: 8,
        width: 35, // Slightly smaller width for mobile
        flexShrink: 0, // Don't shrink percentage
    },
    portfolioName: {
        fontSize: 14,
        color: '#0f172a',
        marginRight: 4,
        flex: 1, // Take remaining space
        minWidth: 0, // Allow text truncation
    },
    portfolioSymbol: {
        fontSize: 12,
        color: '#14b8a6',
        fontWeight: '500',
        marginLeft: 4,
        flexShrink: 0, // Don't shrink symbol
    },
    portfolioAmount: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
        marginLeft: 8,
        flexShrink: 0, // Don't shrink amount
        textAlign: 'right',
    },
    targetSection: {
        marginTop: 24,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    targetTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6b7280',
        marginBottom: 12,
    },
    targetItem: {
        fontSize: 14,
        color: '#6366f1',
        marginBottom: 4,
    },
    targetName: {
        color: '#8b5cf6',
    },
    activityCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
    },
    activityContent: {
        // Container for activity items
    },
    activityItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        paddingVertical: 16,
    },
    activityRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    activityDate: {
        fontSize: 14,
        color: '#6b7280',
        width: 80,
        paddingTop: 2,
    },
    activityInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    activityColorBar: {
        width: 4,
        height: '100%',
        minHeight: 48,
        marginRight: 16,
        borderRadius: 2,
    },
    activityMainContent: {
        flex: 1,
    },
    activityHeader: {
        flex: 1,
    },
    activityTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    activityType: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
    },
    activityDescription: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
    },
    activityAmount: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
        marginLeft: 16,
        paddingTop: 2,
    },
    negativeAmount: {
        color: '#dc2626',
    },
    activityDetails: {
        marginTop: 16,
        marginLeft: isLargeScreen ? 100 : 20, // Less margin on mobile
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: isLargeScreen ? 16 : 12, // Less padding on mobile
    },
    contributionSummary: {
        // Base container
    },
    detailsTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    contributionRow: {
        marginBottom: 8,
    },
    contributionColumn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    contributionLabel: {
        fontSize: isLargeScreen ? 12 : 10, // Smaller on mobile
        fontWeight: '600',
        color: '#6b7280',
        flex: 1,
        textAlign: 'center',
    },
    cryptoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: isLargeScreen ? 8 : 6, // Less padding on mobile
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    cryptoName: {
        flex: 2,
        minWidth: 0, // Allow shrinking
    },
    cryptoText: {
        fontSize: isLargeScreen ? 14 : 12, // Smaller on mobile
        color: '#0f172a',
    },
    cryptoSymbol: {
        fontSize: isLargeScreen ? 12 : 10, // Smaller on mobile
        color: '#14b8a6',
        fontWeight: '500',
    },
    cryptoShares: {
        flex: 1,
        fontSize: isLargeScreen ? 14 : 11, // Smaller on mobile
        color: '#6b7280',
        textAlign: 'center',
        minWidth: 0, // Allow shrinking
    },
    cryptoPrice: {
        flex: 1,
        fontSize: isLargeScreen ? 14 : 11, // Smaller on mobile
        color: '#6b7280',
        textAlign: 'center',
        minWidth: 0, // Allow shrinking
    },
    cryptoAmount: {
        flex: 1,
        fontSize: isLargeScreen ? 14 : 11, // Smaller on mobile
        color: '#0f172a',
        fontWeight: '500',
        textAlign: 'center',
        minWidth: 0, // Allow shrinking
    },
    subtotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#d1d5db',
        marginTop: 8,
    },
    subtotalLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },
    subtotalAmount: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
    },
    employerSection: {
        marginTop: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
});
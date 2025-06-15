// app/dashboard.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 768;

// Mock data for crypto portfolio
const portfolioData = [
    { name: 'Bitcoin', symbol: 'BTC', percentage: 45, color: '#F7931A', amount: '$22,444.50' },
    { name: 'Ethereum', symbol: 'ETH', percentage: 30, color: '#627EEA', amount: '$14,963.00' },
    { name: 'Solana', symbol: 'SOL', percentage: 15, color: '#9945FF', amount: '$7,481.50' },
    { name: 'USDC Stablecoin', symbol: 'USDC', percentage: 10, color: '#2775CA', amount: '$4,987.67' },
];

// Mock data for activity
const activityData = [
    {
        id: 1,
        date: '06/10/2025',
        type: 'Auto-Invest',
        description: 'Your weekly auto-investment of $125.00.',
        amount: '$125.00',
        color: '#14b8a6',
        expanded: false,
        details: {
            userAmount: '$75.00',
            employerAmount: '$50.00',
            breakdown: [
                { name: 'Bitcoin', symbol: 'BTC', shares: '0.00156', price: '$48,077.23', amount: '$56.25' },
                { name: 'Ethereum', symbol: 'ETH', shares: '0.01124', price: '$3,340.67', amount: '$37.50' },
                { name: 'Solana', symbol: 'SOL', shares: '0.1089', price: '$172.45', amount: '$18.75' },
                { name: 'USDC Stablecoin', symbol: 'USDC', shares: '12.50', price: '$1.00', amount: '$12.50' },
            ]
        }
    },
    {
        id: 2,
        date: '06/09/2025',
        type: 'Staking Rewards',
        description: 'Your crypto earned $8.43 in staking rewards.',
        amount: '$8.43',
        color: '#14b8a6',
        expanded: false,
    },
    {
        id: 3,
        date: '06/07/2025',
        type: 'Rebalance',
        description: 'Your portfolio was rebalanced to maintain your investment settings.',
        amount: null,
        color: '#f59e0b',
        expanded: false,
    },
    {
        id: 4,
        date: '06/03/2025',
        type: 'Auto-Invest',
        description: 'Your weekly auto-investment of $125.00.',
        amount: '$125.00',
        color: '#14b8a6',
        expanded: false,
        details: {
            userAmount: '$75.00',
            employerAmount: '$50.00',
            breakdown: [
                { name: 'Bitcoin', symbol: 'BTC', shares: '0.00162', price: '$46,296.30', amount: '$56.25' },
                { name: 'Ethereum', symbol: 'ETH', shares: '0.01167', price: '$3,214.87', amount: '$37.50' },
                { name: 'Solana', symbol: 'SOL', shares: '0.1124', price: '$166.89', amount: '$18.75' },
                { name: 'USDC Stablecoin', symbol: 'USDC', shares: '12.50', price: '$1.00', amount: '$12.50' },
            ]
        }
    },
    {
        id: 5,
        date: '06/01/2025',
        type: 'Network Fees',
        description: 'You paid $2.18 in transaction fees for portfolio rebalancing.',
        amount: '-$2.18',
        color: '#6b7280',
        expanded: false,
    },
    {
        id: 6,
        date: '05/27/2025',
        type: 'Auto-Invest',
        description: 'Your weekly auto-investment of $125.00.',
        amount: '$125.00',
        color: '#14b8a6',
        expanded: false,
        details: {
            userAmount: '$75.00',
            employerAmount: '$50.00',
            breakdown: [
                { name: 'Bitcoin', symbol: 'BTC', shares: '0.00168', price: '$44,642.86', amount: '$56.25' },
                { name: 'Ethereum', symbol: 'ETH', shares: '0.01203', price: '$3,117.24', amount: '$37.50' },
                { name: 'Solana', symbol: 'SOL', shares: '0.1178', price: '$159.16', amount: '$18.75' },
                { name: 'USDC Stablecoin', symbol: 'USDC', shares: '12.50', price: '$1.00', amount: '$12.50' },
            ]
        }
    },
];

export default function DashboardScreen() {
    const [activeTab, setActiveTab] = useState('Overview');
    const [expandedActivity, setExpandedActivity] = useState<number | null>(1); // First item expanded by default
    const [kycCompleted, setKycCompleted] = useState(false); // Track KYC status

    const tabs = ['Overview', 'Portfolio', 'Transactions', 'Settings'];

    const handleLogout = () => {
        router.replace('/(auth)/login');
    };

    const handleActivityToggle = (id: number) => {
        setExpandedActivity(expandedActivity === id ? null : id);
    };

    const DonutChart = () => {
        return (
            <View style={styles.chartContainer}>
                <View style={styles.donutChart}>
                    {/* Bitcoin - 45% */}
                    <View style={[styles.chartSegment, {
                        borderTopColor: '#F7931A',
                        borderRightColor: '#F7931A',
                        borderBottomColor: 'transparent',
                        borderLeftColor: 'transparent',
                        transform: [{ rotate: '-90deg' }]
                    }]} />

                    {/* Ethereum - 30% */}
                    <View style={[styles.chartSegment, {
                        borderTopColor: '#627EEA',
                        borderRightColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderLeftColor: 'transparent',
                        transform: [{ rotate: '72deg' }]
                    }]} />

                    {/* Solana - 15% */}
                    <View style={[styles.chartSegment, {
                        borderTopColor: '#9945FF',
                        borderRightColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderLeftColor: 'transparent',
                        transform: [{ rotate: '180deg' }]
                    }]} />

                    {/* USDC - 10% */}
                    <View style={[styles.chartSegment, {
                        borderTopColor: '#2775CA',
                        borderRightColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderLeftColor: 'transparent',
                        transform: [{ rotate: '234deg' }]
                    }]} />

                    {/* Center hole */}
                    <View style={styles.chartCenter} />
                </View>
            </View>
        );
    };

    const containerStyle = isLargeScreen ? [styles.container, styles.webContainer] : styles.container;

    return (
        <SafeAreaView style={containerStyle}>
            {/* Header Navigation */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <LinearGradient
                        colors={['#6366f1', '#3b82f6']}
                        style={styles.logo}
                    >
                        <Ionicons name="trending-up" size={24} color="white" />
                    </LinearGradient>
                    <Text style={styles.appName}>RampMeDaddy</Text>
                </View>

                <View style={styles.navTabs}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.navTab, activeTab === tab && styles.activeNavTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.navTabText, activeTab === tab && styles.activeNavTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity onPress={handleLogout} style={styles.userSection}>
                    <Text style={styles.userName}>Your Name</Text>
                    <Ionicons name="chevron-down" size={16} color="#6b7280" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={[
                    styles.scrollContent,
                    isLargeScreen && styles.webScrollContent,
                    !isLargeScreen && styles.mobileScrollContent // Add bottom padding for mobile nav
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Setup Banner - only show if KYC not completed */}
                {!kycCompleted && (
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

                    {/* Portfolio Breakdown */}
                    <View style={styles.portfolioCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Portfolio</Text>
                            <TouchableOpacity>
                                <Text style={styles.viewMoreLink}>View More</Text>
                            </TouchableOpacity>
                        </View>

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
                                                    <Text style={styles.contributionLabel}>CRYPTO</Text>
                                                    <Text style={styles.contributionLabel}>SHARES</Text>
                                                    <Text style={styles.contributionLabel}>PRICE</Text>
                                                    <Text style={styles.contributionLabel}>AMOUNT</Text>
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
                                                <Text style={styles.subtotalAmount}>{activity.details.userAmount}</Text>
                                            </View>

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
                                                    <Text style={styles.subtotalAmount}>{activity.details.employerAmount}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
                {/* Bottom Navigation - Mobile Only */}
                {!isLargeScreen && (
                    <View style={styles.bottomNav}>
                        <View style={styles.bottomNavContainer}>
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab;
                                const getIcon = (tabName: string) => {
                                    switch (tabName) {
                                        case 'Overview': return 'home';
                                        case 'Portfolio': return 'pie-chart';
                                        case 'Transactions': return 'list';
                                        case 'Settings': return 'settings';
                                        default: return 'home';
                                    }
                                };

                                return (
                                    <TouchableOpacity
                                        key={tab}
                                        style={styles.bottomNavTab}
                                        onPress={() => setActiveTab(tab)}
                                    >
                                        <Ionicons
                                            name={getIcon(tab) as any}
                                            size={20}
                                            color={isActive ? '#6366f1' : '#9ca3af'}
                                        />
                                        <Text style={[
                                            styles.bottomNavTabText,
                                            isActive && styles.bottomNavTabTextActive
                                        ]}>
                                            {tab}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                )}
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
    header: {
        backgroundColor: 'white',
        paddingHorizontal: isLargeScreen ? 32 : 24,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    navTabs: {
        flexDirection: 'row',
        alignItems: 'center',
        ...(isLargeScreen ? {} : { display: 'none' }),
    },
    navTab: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeNavTab: {
        borderBottomColor: '#14b8a6',
    },
    navTabText: {
        fontSize: 16,
        color: '#6b7280',
        fontWeight: '500',
    },
    activeNavTabText: {
        color: '#0f172a',
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontSize: 14,
        color: '#374151',
        marginRight: 8,
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
    mobileScrollContent: {
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
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    donutChart: {
        width: 160,
        height: 160,
        position: 'relative',
    },
    chartSegment: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 20,
        borderColor: 'transparent',
    },
    chartCenter: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
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
    },
    portfolioItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12,
    },
    portfolioPercentage: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
        marginRight: 8,
    },
    portfolioName: {
        fontSize: 14,
        color: '#0f172a',
        marginRight: 4,
    },
    portfolioSymbol: {
        fontSize: 12,
        color: '#14b8a6',
        fontWeight: '500',
    },
    portfolioAmount: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
    },
    targetSection: {
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
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
        marginLeft: 100, // Align with content after date
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: 16,
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
    cryptoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    cryptoName: {
        flex: 2,
    },
    cryptoText: {
        fontSize: 14,
        color: '#0f172a',
    },
    cryptoSymbol: {
        fontSize: 12,
        color: '#14b8a6',
        fontWeight: '500',
    },
    cryptoShares: {
        flex: 1,
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'right',
    },
    cryptoPrice: {
        flex: 1,
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'right',
    },
    cryptoAmount: {
        flex: 1,
        fontSize: 14,
        color: '#0f172a',
        fontWeight: '500',
        textAlign: 'right',
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
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingBottom: Platform.OS === 'ios' ? 34 : 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    bottomNavContainer: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingHorizontal: 8,
    },
    bottomNavTab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 4,
    },
    bottomNavTabText: {
        fontSize: 10,
        color: '#9ca3af',
        marginTop: 2,
        fontWeight: '500',
    },
    bottomNavTabTextActive: {
        color: '#6366f1',
        fontWeight: '600',
    },
});
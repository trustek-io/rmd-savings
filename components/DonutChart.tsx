// components/DonutChart.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const DonutChart = () => {
    const data = [
        { percentage: 42, color: '#f97316' }, // Bitcoin - Orange
        { percentage: 28, color: '#8b5cf6' }, // Ethereum - Purple
        { percentage: 18, color: '#06b6d4' }, // Solana - Cyan
        { percentage: 12, color: '#10b981' }, // USDC - Green
    ];

    const size = 160;
    const strokeWidth = 20;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    let cumulativePercentage = 0;

    return (
        <View style={styles.container}>
            <Svg height={size} width={size} style={styles.svg}>
                {data.map((item, index) => {
                    const strokeDasharray = `${item.percentage * circumference / 100} ${circumference}`;
                    const strokeDashoffset = -cumulativePercentage * circumference / 100;

                    cumulativePercentage += item.percentage;

                    return (
                        <Circle
                            key={index}
                            stroke={item.color}
                            fill="none"
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            transform={`rotate(-90 ${size / 2} ${size / 2})`}
                        />
                    );
                })}
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    svg: {
        transform: [{ rotate: '0deg' }],
    },
});

export default DonutChart;
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useGlobalStyles } from '../../styles/GlobalStyles';
import { useTheme } from '../../context/ThemeContext';


const HomeScreen = () => {
    const recentRides = [
        { id: '1', pickup: 'MG Road', drop: 'Electronic City' },
        { id: '2', pickup: 'Indiranagar', drop: 'Whitefield' },
    ];

    const GlobalStyles = useGlobalStyles();

    const { theme, colors: GlobalColors } = useTheme();

    console.log("GlobalColors.buttonBackground => ", GlobalColors.buttonBackground)

    return (
        <View style={GlobalStyles.container}>
            <SafeAreaView>
                {/* Header */}
                <Text style={GlobalStyles.header}>Farely</Text>

                {/* Input Fields */}
                <TextInput style={GlobalStyles.input} placeholder="Enter Pickup Location" placeholderTextColor={GlobalColors.textSecondary} />
                <TextInput style={GlobalStyles.input} placeholder="Enter Drop Location" placeholderTextColor={GlobalColors.textSecondary} />

                {/* Find Ride Button */}
                <TouchableOpacity style={[GlobalStyles.button, { backgroundColor: GlobalColors.buttonBackground }]}>
                    <Text style={[GlobalStyles.buttonText, { color: GlobalColors.buttonText }]}>Find a Ride</Text>
                </TouchableOpacity>

                {/* Recent Rides */}
                <Text style={[styles.subHeader, { color: GlobalColors.textSecondary }]}>Recent Rides</Text>
                <FlatList
                    data={recentRides}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.rideItem, { borderBottomColor: GlobalColors.border }]}>
                            <Text style={{ color: GlobalColors.textPrimary }}>{item.pickup} → {item.drop}</Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    rideItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default HomeScreen;

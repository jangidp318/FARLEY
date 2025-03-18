import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { useTheme } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { capitalizeString } from '../../utils/functions/capitalizeString';

const ProfileScreen = () => {
    const { theme, toggleTheme } = useTheme();
    const { signOut } = useContext(AuthContext);
    return (
        <View style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
            <SafeAreaView>
                <View style={theme === 'dark' ? styles.darkProfileView : styles.lightContainer}>
                    <Text style={theme === 'dark' ? styles.lightText : styles.darkText}>Hello</Text>
                </View>
                <Button title={`${capitalizeString(theme)} Theme`} onPress={toggleTheme} />
                <Button title="Logout" onPress={signOut} />
            </SafeAreaView>
        </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    darkContainer: {
        flex: 1,
        backgroundColor: '#121212'
    },
    lightContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    darkProfileView: {
        marginHorizontal: 15,
        padding: 10,
        borderRadius: 10,
        height: 200,
        backgroundColor: '#282828'
    },
    darkText: {
        color: '#ffffff',
        fontSize: 18
    },
    lightText: {
        color: '#000000',
        fontSize: 18
    },
});
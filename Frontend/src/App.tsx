import { View, Text, Button } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './screens/SplashScreen';
import { AuthContext, AuthProvider } from './context/AuthContext';
import MainStackNavigator from './navigators/MainStackNavigator';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { theme, toggleTheme } = useTheme(); // Temp

  const navigationRef = useRef<any>(null);

  const onStateChange = () => {
    const currentRoute = navigationRef.current?.getCurrentRoute();
    if (currentRoute) {
    }
  };
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />}
      {/* Temp */}
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
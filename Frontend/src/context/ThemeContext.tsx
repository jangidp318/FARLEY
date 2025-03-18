import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalColors } from '../styles/GlobalColors';


// Define the shape of the context
interface ThemeContextProps {
    theme: 'light' | 'dark';
    colors: typeof GlobalColors.light;
    toggleTheme: () => void;
}

// Default values
const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    colors: GlobalColors.light,
    toggleTheme: () => { },
});

// Theme Provider Component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemTheme = useColorScheme() as 'light' | 'dark';
    const [theme, setTheme] = useState<'light' | 'dark'>(systemTheme || 'light');

    // Load stored theme from AsyncStorage
    useEffect(() => {
        const loadStoredTheme = async () => {
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme === 'light' || storedTheme === 'dark') {
                setTheme(storedTheme);
            }
        };
        loadStoredTheme();
    }, []);

    // Toggle theme and save it
    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        await AsyncStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, colors: GlobalColors[theme], toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom Hook to use Theme
export const useTheme = () => useContext(ThemeContext);

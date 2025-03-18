import { StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const useGlobalStyles = () => {
    const { colors } = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: colors.background,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.primary,
        },
        input: {
            height: 50,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 10,
            paddingHorizontal: 10,
            color: colors.textPrimary
        },
        button: {
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 20,
            backgroundColor: colors.buttonBackground
        },
        buttonText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.buttonText
        },
    })
};

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomePage: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      overflow: 'visible',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 58,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
      lineHeight: 80,
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: colors.tabIconDefault,
    },
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>🏠 Home</Text>
        <Text style={styles.subtitle}>Trang chủ của ứng dụng Rophim</Text>
      </View>
    </SafeAreaView>
  );
};

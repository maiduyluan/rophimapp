import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  title: string;
  onSearchPress: () => void;
  showSearchIcon?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onSearchPress,
  showSearchIcon = true,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    titleText: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
    },
  });

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.titleText}>{title}</Text>
      {showSearchIcon && (
        <Pressable onPress={onSearchPress}>
          <MaterialIcons name="search" size={28} color={colors.text} />
        </Pressable>
      )}
    </View>
  );
};

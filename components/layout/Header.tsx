import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface HeaderProps {
  onMenuPress: () => void;
  onSearchPress: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuPress,
  onSearchPress,
  title = 'Rophim',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    headerContent: {
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      backgroundColor: 'transparent',
    },
    searchInput: {
      flex: 1,
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 12,
      color: colors.text,
      fontSize: 16,
      marginRight: 12,
    },
    buttonSearch: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightButtons: {
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm phim..."
          placeholderTextColor={colors.tabIconDefault}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.rightButtons}></View>
      </View>
    </View>
  );
};

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

interface HeaderProps {
  onMenuPress: () => void;
  onSearchPress: () => void;
  title?: string;
  onSearch?: (query: string) => void;
  isSearchPage?: boolean;
  initialSearchQuery?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuPress,
  onSearchPress,
  title = 'Rophim',
  onSearch,
  isSearchPage = false,
  initialSearchQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

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
    searchInputContainer: {
      flex: 1,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 8,
      paddingHorizontal: 12,
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 40,
      color: '#fff',
      fontSize: 16,
      paddingHorizontal: 0,
    },
    clearButton: {
      justifyContent: 'center',
      alignItems: 'center',
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

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      if (isSearchPage && onSearch) {
        onSearch(searchQuery);
      } else {
        router.push({
          pathname: '/search',
          params: { query: searchQuery },
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm phim..."
            placeholderTextColor={colors.tabIconDefault}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <Pressable style={styles.clearButton} onPress={handleClear}>
              <MaterialIcons name="close" size={24} color="#999" />
            </Pressable>
          )}
        </View>

        <View style={styles.rightButtons}></View>
      </View>
    </View>
  );
};

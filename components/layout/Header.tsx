import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/slices/themeSlice';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const colorScheme = useColorScheme();
  const themeState = useAppSelector((state) => state.theme.colorScheme);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme ?? 'light'];

  const styles = StyleSheet.create({
    container: {
      paddingTop: insets.top,
      backgroundColor: colors.background,
    },
    headerContent: {
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      backgroundColor: colors.background,
    },
    buttonLogo: {
      height: 54,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 4,
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
        <TouchableOpacity
          style={styles.buttonLogo}
          onPress={() => router.push('/')}
          activeOpacity={0.7}
        >
          <Fontisto name="film" size={40} color={colors.text} />
          <Text style={{ color: colors.text, fontSize: 25, fontWeight: '600' }}>
            Rổ Phim
          </Text>
        </TouchableOpacity>

        <View style={styles.rightButtons}>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={onSearchPress}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={30} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(toggleTheme())}
            activeOpacity={0.7}
          >
            <Ionicons
              name={themeState === 'dark' ? 'sunny' : 'moon'}
              size={30}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

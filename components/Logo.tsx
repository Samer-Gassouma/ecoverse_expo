import * as React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { TreePine } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '~/lib/useColorScheme';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ size = 'md' }: LogoProps) => {
  const { isDarkColorScheme } = useColorScheme();

  const sizes = {
    sm: { icon: 24, text: 'text-xl' },
    md: { icon: 32, text: 'text-3xl' },
    lg: { icon: 44, text: 'text-4xl' },
  };

  const gradients = {
    dark: ['#22c55e', '#16a34a'], // green-500 to green-600
    light: ['#15803d', '#166534'], // green-700 to green-800
  };

  return (
    <View className="flex-row items-center justify-center">
      <TreePine 
        size={sizes[size].icon} 
        fill={isDarkColorScheme ? '#22c55e' : '#16a34a'}
      />
      <View className="ml-2">
        <LinearGradient
          colors={isDarkColorScheme ? gradients.dark as [string, string] : gradients.light as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="px-2 py-1 rounded-lg"
        >
          <Text className={`${sizes[size].text} font-bold text-primary-foreground`}>
            EcoVerse
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
}; 
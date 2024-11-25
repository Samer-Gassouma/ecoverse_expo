import * as React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '~/components/ui/text';
import { BlurView } from 'expo-blur';
import { Wallet } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { ethers } from 'ethers';

export const WalletConnect = () => {
  const { isDarkColorScheme } = useColorScheme();
  const [address, setAddress] = React.useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // Implementation will depend on the Web3 provider you choose
      // This is a placeholder for the actual implementation
      // Consider using WalletConnect or similar solution
      console.log('Connecting wallet...');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <Pressable onPress={connectWallet}>
      <BlurView
        intensity={isDarkColorScheme ? 20 : 40}
        className="rounded-xl overflow-hidden"
      >
        <View className="p-4 flex-row items-center">
          <Wallet size={24} className="text-primary mr-2" />
          <Text className="font-semibold">
            {address 
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : 'Connect Wallet'
            }
          </Text>
        </View>
      </BlurView>
    </Pressable>
  );
}; 
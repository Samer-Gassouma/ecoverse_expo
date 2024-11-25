import * as React from 'react';
import { View, ScrollView, Pressable, Image } from 'react-native';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Leaf, TreePine, Droplets, Wind, Coins, ChevronRight, Bell } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';
import { WalletConnect } from '~/app/components/WalletConnect';

const ImpactCard = ({ icon: Icon, title, value, suffix, delay = 0 }: { icon: any, title: string, value: string, suffix: string, delay: number }) => {
  const { isDarkColorScheme } = useColorScheme();
  
  return (
    <Animated.View 
      entering={FadeInDown.delay(delay)}
      className="w-[48%] mb-4"
    >
      <BlurView
        intensity={isDarkColorScheme ? 20 : 40}
        className="rounded-xl overflow-hidden"
      >
        <View className="p-4">
          <Icon size={24} className="text-primary mb-2" />
          <Text className="text-sm text-gray-500 mb-1">{title}</Text>
          <View className="flex-row items-baseline">
            <Text className="text-2xl font-bold">{value}</Text>
            <Text className="text-sm text-gray-500 ml-1">{suffix}</Text>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
};

const ActivityItem = ({ title, time, points, image }: { title: string, time: string, points: number, image?: string }) => {
  const { isDarkColorScheme } = useColorScheme();
  
  return (
    <View className="flex-row items-center mb-4">
      {image ? (
        <Image 
          source={{ uri: image }} 
          className="w-12 h-12 rounded-full mr-3"
        />
      ) : (
        <View className="w-12 h-12 rounded-full bg-primary/20 mr-3" />
      )}
      <View className="flex-1">
        <Text className="font-semibold">{title}</Text>
        <Text className={`text-sm ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
          {time}
        </Text>
      </View>
      <Text className="text-primary font-semibold">+{points} coins</Text>
    </View>
  );
};

export default function HomeScreen() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ScrollView
      className={`flex-1 ${isDarkColorScheme ? 'bg-black' : 'bg-zinc-50'}`}
    >
      {/* Header */}
      <LinearGradient
        colors={isDarkColorScheme 
          ? ['rgba(34, 197, 94, 0.2)', 'transparent'] 
          : ['rgba(21, 128, 61, 0.2)', 'transparent']
        }
        className="pt-16 pb-4"
      >
        <View className="px-6 flex-row justify-between items-center">
          <View>
            <Text className={`text-2xl font-bold ${isDarkColorScheme ? 'text-white' : 'text-gray-900'}`}>
              Welcome back, Ivan
            </Text>
            <Text className={`mt-1 ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Your environmental impact this week
            </Text>
          </View>
          <Pressable>
            <BlurView intensity={30} className="rounded-full overflow-hidden">
              <View className="p-2">
                <Bell size={24} color={isDarkColorScheme ? '#fff' : '#000'} />
              </View>
            </BlurView>
          </Pressable>
        </View>

        {/* Add WalletConnect component */}
        <View className="px-6 mt-4">
          <WalletConnect />
        </View>

        {/* Coins Card */}
        <Animated.View 
          entering={FadeInDown.duration(1000)}
          className="mx-6 mt-6"
        >
          <BlurView
            intensity={isDarkColorScheme ? 40 : 60}
            className="rounded-2xl overflow-hidden"
          >
            <LinearGradient
              colors={isDarkColorScheme ? ['#22c55e', '#16a34a'] : ['#15803d', '#166534']}
              className="p-4"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Coins size={24} color="white" />
                  <Text className="text-white text-lg font-semibold ml-2">EcoCoins</Text>
                </View>
                <Pressable className="flex-row items-center">
                  <Text className="text-white mr-1">View History</Text>
                  <ChevronRight size={16} color="white" />
                </Pressable>
              </View>
              <Text className="text-white text-3xl font-bold mt-4">2,450</Text>
              <Text className="text-white/80 mt-1">+150 coins this week</Text>
            </LinearGradient>
          </BlurView>
        </Animated.View>
      </LinearGradient>

      {/* Impact Stats */}
      <View className="px-6 -mt-4">
        <View className="flex-row flex-wrap justify-between">
          <ImpactCard
            icon={TreePine}
            title="Trees Planted"
            value="12"
            suffix="trees"
            delay={200}
          />
          <ImpactCard
            icon={Leaf}
            title="Carbon Offset"
            value="2.4"
            suffix="tons"
            delay={400}
          />
          <ImpactCard
            icon={Droplets}
            title="Water Saved"
            value="140"
            suffix="liters"
            delay={600}
          />
          <ImpactCard
            icon={Wind}
            title="Clean Energy"
            value="45"
            suffix="kWh"
            delay={800}
          />
        </View>

        {/* Active Initiatives */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold">Active Initiatives</Text>
            <Pressable className='flex-row items-center' onPress={() => router.push('/Map')}>
              <Text className="text-primary mr-1">See All</Text>
              <ChevronRight size={16} color={isDarkColorScheme ? '#fff' : '#000'} />
            </Pressable>
          </View>
          <Pressable>
            <BlurView
              intensity={isDarkColorScheme ? 20 : 40}
              className="rounded-xl overflow-hidden mb-4"
            >
              <View className="p-4">
                <Text className="text-lg font-semibold">Local Beach Cleanup</Text>
                <Text className={`mt-1 ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
                  This Saturday • 15 participants
                </Text>
                <View className="mt-3">
                  <LinearGradient
                    colors={['#22c55e', '#16a34a']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="h-2 rounded-full"
                    style={{ width: '75%' }}
                  />
                  <Text className="text-xs text-gray-500 mt-1">75% to goal</Text>
                </View>
              </View>
            </BlurView>
          </Pressable>
        </View>

        {/* Recent Activity */}
        <View className="mt-6 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold">Recent Activity</Text>
            <Pressable>
              <Text className="text-primary">View All</Text>
            </Pressable>
          </View>
          <ActivityItem 
            title="Completed Beach Cleanup"
            time="2 hours ago"
            points={100}
            image="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          />
          <ActivityItem 
            title="Recycled 5kg of Plastic"
            time="Yesterday"
            points={50}
          />
          <ActivityItem 
            title="Tree Planting Initiative"
            time="2 days ago"
            points={200}
            image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
          />
        </View>
      </View>
    </ScrollView>
  );
} 
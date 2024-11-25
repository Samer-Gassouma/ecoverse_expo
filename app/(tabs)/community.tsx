import * as React from 'react';
import { View, ScrollView, Pressable, Image, Dimensions } from 'react-native';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Medal, Crown, Users, Star, Award, ChevronRight, Filter } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Mock data for leaderboard
const LEADERBOARD_DATA = {
  topUsers: [
    {
      id: '1',
      rank: 1,
      name: 'Sarah Johnson',
      points: 12450,
      events: 24,
      avatar: 'https://i.pravatar.cc/150?img=1',
      badges: ['Top Contributor', 'Event Leader'],
      impact: {
        trees: 120,
        co2: '2.4 tons',
      }
    },
    {
      id: '2',
      rank: 2,
      name: 'Michael Chen',
      points: 11200,
      events: 20,
      avatar: 'https://i.pravatar.cc/150?img=2',
      badges: ['Eco Warrior'],
      impact: {
        trees: 95,
        co2: '1.9 tons',
      }
    },
    {
      id: '3',
      rank: 3,
      name: 'Emma Davis',
      points: 10800,
      events: 18,
      avatar: 'https://i.pravatar.cc/150?img=3',
      badges: ['Rising Star'],
      impact: {
        trees: 85,
        co2: '1.7 tons',
      }
    },
  ],
  currentUser: {
    rank: 28,
    name: 'Alex Smith',
    points: 5240,
    events: 8,
    avatar: 'https://i.pravatar.cc/150?img=8',
    badges: ['Newcomer'],
    impact: {
      trees: 25,
      co2: '0.5 tons',
    }
  },
  categories: [
    { id: 'all', label: 'All Time' },
    { id: 'month', label: 'This Month' },
    { id: 'week', label: 'This Week' },
  ]
};

const TopUserCard = ({ user, index }: { user: typeof LEADERBOARD_DATA.topUsers[0], index: number }) => {
  const { isDarkColorScheme } = useColorScheme();
  const isFirst = index === 0;

  const RankIcon = isFirst ? Crown : Medal;
  const rankColor = index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32';

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 200)}
      className={`${isFirst ? 'bg-primary/10' : 'bg-white/80'} rounded-2xl p-4 mb-4`}
    >
      <View className="flex-row items-center">
        <View className="relative">
          <Image 
            source={{ uri: user.avatar }}
            className="w-16 h-16 rounded-full"
          />
          <View className="absolute -top-2 -right-2 bg-white rounded-full p-1">
            <RankIcon size={16} color={rankColor} fill={rankColor} />
          </View>
        </View>
        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold">{user.name}</Text>
          <View className="flex-row items-center mt-1">
            <Star size={14} className="text-yellow-500" fill="#EAB308" />
            <Text className="text-gray-500 ml-1">{user.points.toLocaleString()} points</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-3xl font-bold text-primary">#{user.rank}</Text>
          <Text className="text-gray-500 text-sm">{user.events} events</Text>
        </View>
      </View>

      {/* Badges */}
      <View className="flex-row mt-3">
        {user.badges.map((badge, idx) => (
          <View 
            key={idx}
            className="bg-primary/10 rounded-full px-3 py-1 mr-2"
          >
            <Text className="text-primary text-xs">{badge}</Text>
          </View>
        ))}
      </View>

      {/* Impact Stats */}
      <View className="flex-row mt-3 bg-gray-50 rounded-xl p-3">
        <View className="flex-1 flex-row items-center">
          <Award size={16} className="text-primary mr-2" />
          <Text className="text-gray-600">{user.impact.trees} trees</Text>
        </View>
        <View className="flex-1 flex-row items-center">
          <Star size={16} className="text-primary mr-2" />
          <Text className="text-gray-600">{user.impact.co2} saved</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const UserRankCard = ({ user }: { user: typeof LEADERBOARD_DATA.currentUser }) => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <BlurView 
      intensity={isDarkColorScheme ? 40 : 60}
      className="rounded-2xl overflow-hidden mb-6"
    >
      <LinearGradient
        colors={isDarkColorScheme ? ['#0f172a', '#0f172a'] : ['#ffffff', '#ffffff']}
        className="p-4"
      >
        <Text className="text-lg font-semibold mb-4">Your Ranking</Text>
        <View className="flex-row items-center">
          <Image 
            source={{ uri: user.avatar }}
            className="w-16 h-16 rounded-full"
          />
          <View className="flex-1 ml-4">
            <Text className="text-lg font-bold">{user.name}</Text>
            <View className="flex-row items-center mt-1">
              <Star size={14} className="text-yellow-500" fill="#EAB308" />
              <Text className="text-gray-500 ml-1">{user.points.toLocaleString()} points</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-3xl font-bold text-primary">#{user.rank}</Text>
            <Text className="text-gray-500 text-sm">{user.events} events</Text>
          </View>
        </View>

        {/* Progress to Next Rank */}
        <View className="mt-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Next rank: #{user.rank - 1}</Text>
            <Text className="text-gray-500">760 points to go</Text>
          </View>
          <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <View className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between mt-4 bg-primary/5 rounded-xl p-3">
          <View className="items-center">
            <Text className="text-gray-500 text-sm">Trees Planted</Text>
            <Text className="text-lg font-bold">{user.impact.trees}</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-500 text-sm">CO₂ Saved</Text>
            <Text className="text-lg font-bold">{user.impact.co2}</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-500 text-sm">Events</Text>
            <Text className="text-lg font-bold">{user.events}</Text>
          </View>
        </View>
      </LinearGradient>
    </BlurView>
  );
};

export default function CommunityScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = React.useState('all');

  return (
    <ScrollView 
      className={`flex-1 ${isDarkColorScheme ? 'bg-black' : 'bg-zinc-50'}`}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-2xl font-bold">Leaderboard</Text>
          <Text className="text-gray-500 mt-1">See where you rank globally</Text>
        </View>
        <Pressable className="bg-primary/10 rounded-full p-2">
          <Filter size={20} className="text-primary" />
        </Pressable>
      </View>

      {/* Categories */}
      <View className="flex-row mb-6">
        {LEADERBOARD_DATA.categories.map(category => (
          <Pressable
            key={category.id}
            onPress={() => setActiveCategory(category.id)}
            className={`rounded-full px-4 py-2 mr-2 ${
              activeCategory === category.id ? 'bg-primary' : 'bg-primary/10'
            }`}
          >
            <Text className={`${
              activeCategory === category.id ? 'text-white' : 'text-primary'
            } font-medium`}>
              {category.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Current User Ranking */}
      <UserRankCard user={LEADERBOARD_DATA.currentUser} />

      {/* Top Users */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-semibold">Top Contributors</Text>
          <Pressable className="flex-row items-center">
            <Text className="text-primary mr-1">View All</Text>
            <ChevronRight size={16} className="text-primary" />
          </Pressable>
        </View>
        {LEADERBOARD_DATA.topUsers.map((user, index) => (
          <TopUserCard key={user.id} user={user} index={index} />
        ))}
      </View>
    </ScrollView>
  );
} 
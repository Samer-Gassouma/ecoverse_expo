import * as React from 'react';
import { View, ScrollView, Pressable, Image, Dimensions } from 'react-native';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Trophy, Medal, Crown, Users, Star, Award, 
  ArrowLeft, Camera, Upload, TreePine, Clock,
  ChevronRight, MapPin
} from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Mock data for event progress
const EVENT_DATA = {
  id: '1',
  title: 'Beach Cleanup Miami',
  progress: {
    current: 75,
    target: 100,
    unit: 'kg',
    timeLeft: '2 days',
  },
  currentUser: {
    rank: 5,
    contribution: 12,
    points: 240,
    status: 'in-progress',
    proofs: [
      { id: '1', image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec' },
      { id: '2', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09' },
    ]
  },
  leaderboard: [
    {
      id: '1',
      rank: 1,
      name: 'John Doe',
      contribution: 18,
      points: 360,
      avatar: 'https://i.pravatar.cc/150?img=1',
      verified: true
    },
    {
        id: '2',
        rank: 2,
        name: 'Jane Doe',
        contribution: 15,
        points: 300,
        avatar: 'https://i.pravatar.cc/150?img=2',
        verified: false
    },
    {
        id: '3',
        rank: 3,
        name: 'Jim Beam',
        contribution: 12,
        points: 240,
        avatar: 'https://i.pravatar.cc/150?img=3',
        verified: false
    },
    {
        id: '4',
        rank: 4,
        name: 'John Doe',
        contribution: 10,
        points: 200,
        avatar: 'https://i.pravatar.cc/150?img=4',
        verified: true
    }
  ]
};

type LeaderboardUser = typeof EVENT_DATA.leaderboard[0];

const TopThree: React.FC<{ users: LeaderboardUser[] }> = ({ users }) => {
  const positions = [1, 0, 2];
  const heights = ['h-24', 'h-32', 'h-20'];
  const delays = [200, 0, 400];
  
  return (
    <View className="flex-row items-end justify-center mb-8 mt-4">
      {positions.map((pos, idx) => {
        const user = users[pos];
        return (
          <Animated.View 
            key={user.id}
            entering={FadeInDown.delay(delays[idx])}
            className="items-center mx-2"
          >
            <Image 
              source={{ uri: user.avatar }}
              className="w-16 h-16 rounded-full border-2 border-white mb-2"
            />
            <View className="items-center mb-2">
              <Text className="font-bold">{user.name}</Text>
              <Text className="text-primary font-semibold">
                {user.contribution} {EVENT_DATA.progress.unit}
              </Text>
            </View>
            <LinearGradient
              colors={pos === 0 ? ['#FFD700', '#FFA000'] : 
                     pos === 1 ? ['#C0C0C0', '#A0A0A0'] :
                     ['#CD7F32', '#A05A2C']}
              className={`w-20 rounded-t-lg ${heights[idx]} items-center pt-2`}
            >
              <Text className="text-white font-bold text-lg">#{pos + 1}</Text>
            </LinearGradient>
          </Animated.View>
        );
      })}
    </View>
  );
};

const LeaderboardItem = ({ user, index }: { 
  user: typeof EVENT_DATA.leaderboard[0],
  index: number 
}) => {
  const isTop3 = index < 3;
  
  return (
    <Animated.View
      entering={SlideInRight.delay(index * 100)}
      className="mb-3"
    >
      <BlurView intensity={60} className="rounded-2xl overflow-hidden">
        <Pressable className="flex-row items-center p-4">
          <Text className={`font-bold text-xl w-8 ${
            isTop3 ? 'text-primary' : 'text-gray-500'
          }`}>
            #{user.rank}
          </Text>
          <Image 
            source={{ uri: user.avatar }}
            className="w-12 h-12 rounded-full mx-3"
          />
          <View className="flex-1">
            <Text className="font-semibold">{user.name}</Text>
            <View className="flex-row items-center">
              <Award size={14} className="text-primary mr-1" />
              <Text className="text-gray-500">
                {user.points} points
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="font-bold text-primary">
              {user.contribution}
              <Text className="text-sm"> {EVENT_DATA.progress.unit}</Text>
            </Text>
            {user.verified && (
              <View className="bg-primary/10 rounded-full px-2 py-0.5 mt-1">
                <Text className="text-primary text-xs">Verified</Text>
              </View>
            )}
          </View>
        </Pressable>
      </BlurView>
    </Animated.View>
  );
};

const SubmissionButton = () => {
  return (
    <Pressable className="bg-primary rounded-2xl p-4 mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Camera size={20} color="white" className="mr-2" />
          <Text className="text-white font-semibold">Submit Your Progress</Text>
        </View>
        <ChevronRight size={20} color="white" />
      </View>
      <Text className="text-white/80 text-sm">
        Upload photos of your contribution to earn points
      </Text>
    </Pressable>
  );
};

export default function EventLeaderboardScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1">
      <LinearGradient
        colors={isDarkColorScheme 
          ? ['#0f172a', '#000000'] 
          : ['#ffffff', '#f8fafc']
        }
        className="flex-1"
      >
        {/* Header */}
        <View className="pt-16 px-6 pb-6">
          <View className="flex-row items-center mb-6">
            <Pressable 
              onPress={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft size={24} className="text-primary" />
            </Pressable>
            <View>
              <Text className="text-2xl font-bold">{EVENT_DATA.title}</Text>
              <View className="flex-row items-center mt-1">
                <MapPin size={14} className="text-gray-500 mr-1" />
                <Text className="text-gray-500">Miami Beach</Text>
              </View>
            </View>
          </View>

          {/* Event Stats */}
          <View className="flex-row justify-between bg-white/10 rounded-2xl p-4">
            <View className="items-center">
              <Text className="text-gray-500 text-sm">Time Left</Text>
              <Text className="text-lg font-bold mt-1">{EVENT_DATA.progress.timeLeft}</Text>
            </View>
            <View className="items-center">
              <Text className="text-gray-500 text-sm">Participants</Text>
              <Text className="text-lg font-bold mt-1">25 people</Text>
            </View>
            <View className="items-center">
              <Text className="text-gray-500 text-sm">Total Collected</Text>
              <Text className="text-lg font-bold mt-1">
                {EVENT_DATA.progress.current} {EVENT_DATA.progress.unit}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1 px-6">
          {/* Top 3 Podium */}
          <TopThree users={EVENT_DATA.leaderboard.slice(0, 3)} />

          {/* Submit Progress Button */}
          <SubmissionButton />

          {/* Your Position */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-3">Your Position</Text>
            <BlurView intensity={60} className="rounded-2xl overflow-hidden">
              <LinearGradient
                colors={['rgba(34, 197, 94, 0.1)', 'rgba(34, 197, 94, 0.05)']}
                className="p-4"
              >
                <View className="flex-row items-center">
                  <Text className="font-bold text-xl text-primary w-8">
                    #{EVENT_DATA.currentUser.rank}
                  </Text>
                  <Image 
                    source={{ uri: EVENT_DATA.currentUser.proofs[0].image }}
                    className="w-12 h-12 rounded-full mx-3"
                  />
                  <View className="flex-1">
                    <Text className="font-semibold">{EVENT_DATA.currentUser.proofs[0].id}</Text>
                    <View className="flex-row items-center">
                      <Award size={14} className="text-primary mr-1" />
                      <Text className="text-gray-500">
                        {EVENT_DATA.currentUser.points} points
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="font-bold text-primary">
                      {EVENT_DATA.currentUser.contribution}
                      <Text className="text-sm"> {EVENT_DATA.progress.unit}</Text>
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </BlurView>
          </View>

          {/* Full Leaderboard */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-3">Leaderboard</Text>
            {EVENT_DATA.leaderboard.map((user, index) => (
              <LeaderboardItem 
                key={user.id} 
                user={user} 
                index={index}
              />
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
} 
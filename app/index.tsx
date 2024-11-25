import * as React from 'react';
import { View, ScrollView, Pressable, Dimensions, ImageBackground } from 'react-native';
import Animated, { 
  FadeIn,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '~/components/ui/text';
import { useRouter } from 'expo-router';
import { ArrowRight, Leaf, Wind, Shield, Globe, Users } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { ThemeToggle } from '~/components/ThemeToggle';
import { Logo } from '~/components/Logo';
import { useColorScheme } from '~/lib/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any, title: string, description: string, delay: number }) => {
  const { isDarkColorScheme } = useColorScheme();
  
  return (
    <Animated.View 
      entering={FadeIn.delay(delay).duration(1000)}
      className={`p-4 rounded-xl mb-4 ${
        isDarkColorScheme ? 'bg-gray-900' : 'bg-white'
      }`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="flex-row items-center mb-2">
        <Icon size={24} className="text-primary mr-2" />
        <Text className="text-lg font-semibold">{title}</Text>
      </View>
      <Text className={`${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </Text>
    </Animated.View>
  );
};

export default function LandingScreen() {
  const router = useRouter();
  const { isDarkColorScheme } = useColorScheme();
  const floatY = useSharedValue(0);
  const rotateLeaf = useSharedValue(0);
  const scaleValue = useSharedValue(1);
  
  const [mounted, setMounted] = React.useState(false);

  /*
  React.useEffect(() => {
    setMounted(true); 
    if (mounted) {
      router.push('/home');
    }
  }, [mounted]);
  */
  
  React.useEffect(() => {
    // Floating animation for logo
    floatY.value = withRepeat(
      withSequence(
        withSpring(10, { damping: 5 }),
        withSpring(-10, { damping: 5 })
      ),
      -1,
      true
    );

    // Rotating animation for decorative elements
    rotateLeaf.value = withRepeat(
      withTiming(360, { duration: 20000 }),
      -1,
      true
    );

    // Subtle pulse animation
    scaleValue.value = withRepeat(
      withSequence(
        withSpring(1.05),
        withSpring(1)
      ),
      -1,
      true
    );
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }]
  }));

  const rotatingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateLeaf.value}deg` }]
  }));

  const pulsingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }]
  }));

  return (
    <ScrollView 
      className={`flex-1 ${isDarkColorScheme ? 'bg-black' : 'bg-zinc-50'}`}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* Background Gradient */}
      <LinearGradient
        colors={isDarkColorScheme 
          ? ['rgba(34, 197, 94, 0.1)', 'transparent'] 
          : ['rgba(21, 128, 61, 0.1)', 'transparent']
        }
        className="absolute top-0 left-0 right-0 h-96"
      />

      {/* Theme Toggle */}
      <View className="absolute top-12 right-6 z-50">
        <BlurView intensity={30} className="rounded-full overflow-hidden">
          <View className="p-4">
            <ThemeToggle />
          </View>
        </BlurView>
      </View>

      {/* Hero Section */}
      <View className="pt-32 px-6">
        <Animated.View entering={FadeIn.duration(1000)}>
          <Logo size="lg" />
          <Text 
            className={`text-3xl font-bold mt-6 text-center
              ${isDarkColorScheme ? 'text-white' : 'text-gray-900'}`}
          >
            Make a Difference{'\n'}for Our Planet
          </Text>
          <Text 
            className={`text-xl text-center mt-4 leading-relaxed
              ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Join thousands of environmental activists making real impact through blockchain technology
          </Text>
        </Animated.View>

        {/* CTA Buttons */}
        <View className="flex-row space-x-4 mt-8">
          <Pressable 
            onPress={() => router.push('/signup')}
            className="flex-1"
          >
            <BlurView intensity={isDarkColorScheme ? 40 : 60} className="rounded-full overflow-hidden">
              <LinearGradient
                colors={isDarkColorScheme ? ['#22c55e', '#16a34a'] : ['#15803d', '#166534']}
                className="h-14 justify-center items-center flex-row"
              >
                <Text className="text-white font-semibold">Get Started</Text>
                <ArrowRight color="white" size={20} className="ml-2" />
              </LinearGradient>
            </BlurView>
          </Pressable>
          
          <Pressable 
            onPress={() => router.push('/login')}
            className="flex-1"
          >
            <BlurView intensity={20} className="rounded-full overflow-hidden">
              <View className="h-14 justify-center items-center border border-gray-400 p-2">
                <Text className="font-semibold">Sign In</Text>
              </View>
            </BlurView>
          </Pressable>
        </View>

        {/* Features Section */}
        <View className="mt-16 mb-8">
          <Text className="text-2xl font-semibold mb-6 text-center">Why Choose Us?</Text>
          
          <FeatureCard
            icon={Globe}
            title="Global Impact"
            description="Connect with environmental initiatives worldwide and track your contribution to global change."
            delay={200}
          />
          
          <FeatureCard
            icon={Shield}
            title="Secure & Transparent"
            description="Blockchain-powered tracking ensures your environmental actions are verified and immutable."
            delay={400}
          />
          
          <FeatureCard
            icon={Users}
            title="Community Driven"
            description="Join a growing community of environmentally conscious individuals making real change."
            delay={600}
          />
        </View>

        {/* Footer */}
        <Text 
          className={`text-center mb-8 text-sm
            ${isDarkColorScheme ? 'text-gray-500' : 'text-gray-600'}`}
        >
          Already making an impact with over 10,000+ members
        </Text>
      </View>
    </ScrollView>
  );
}

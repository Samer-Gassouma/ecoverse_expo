import * as React from 'react';
import { View, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Text } from '~/components/ui/text';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, Lock } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '~/lib/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const { isDarkColorScheme } = useColorScheme();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
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

                {/* Back Button */}
                <Pressable
                    onPress={() => router.back()}
                    className="absolute top-12 left-6 z-50"
                >
                    <BlurView intensity={30} className="rounded-full overflow-hidden">
                        <View className="p-3">
                            <ArrowLeft size={24} color={isDarkColorScheme ? '#fff' : '#000'} />
                        </View>
                    </BlurView>
                </Pressable>

                <View className="flex-1 px-6 pt-32">
                    <Animated.View entering={FadeIn.duration(1000)}>
                        <Text
                            className={`text-3xl font-bold mb-2
                ${isDarkColorScheme ? 'text-white' : 'text-gray-900'}`}
                        >
                            Welcome Back
                        </Text>
                        <Text
                            className={`text-lg mb-8
                ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                            Sign in to continue your eco journey
                        </Text>
                    </Animated.View>

                    <Animated.View
                        entering={SlideInUp.delay(200).duration(1000)}
                        className="space-y-4"
                    >
                        {/* Email Input */}
                        <View>
                            <Text className={`mb-2 ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
                                Email
                            </Text>
                            <BlurView
                                intensity={isDarkColorScheme ? 20 : 40}
                                className="rounded-xl overflow-hidden"
                            >
                                <View className="flex-row items-center p-4">
                                    <Mail size={20} className="text-gray-500 mr-2" />
                                    <TextInput
                                        placeholder="Enter your email"
                                        placeholderTextColor={isDarkColorScheme ? '#6b7280' : '#9ca3af'}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        className={`flex-1 ${isDarkColorScheme ? 'text-white' : 'text-black'}`}
                                    />
                                </View>
                            </BlurView>
                        </View>

                        {/* Password Input */}
                        <View>
                            <Text className={`mb-2 ${isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}`}>
                                Password
                            </Text>
                            <BlurView
                                intensity={isDarkColorScheme ? 20 : 40}
                                className="rounded-xl overflow-hidden"
                            >
                                <View className="flex-row items-center p-4">
                                    <Lock size={20} className="text-gray-500 mr-2" />
                                    <TextInput
                                        placeholder="Enter your password"
                                        placeholderTextColor={isDarkColorScheme ? '#6b7280' : '#9ca3af'}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                        className={`flex-1 ${isDarkColorScheme ? 'text-white' : 'text-black'}`}
                                    />
                                </View>
                            </BlurView>
                        </View>

                        {/* Forgot Password */}
                        <Pressable className="self-end">
                            <Text className="text-primary">Forgot Password?</Text>
                        </Pressable>

                        {/* Login Button */}
                        <Pressable
                            onPress={() => {/* Handle login */ }}
                            className="mt-4"
                        >
                            <BlurView intensity={isDarkColorScheme ? 40 : 60} className="rounded-full overflow-hidden">
                                <LinearGradient
                                    colors={isDarkColorScheme ? ['#22c55e', '#16a34a'] : ['#15803d', '#166534']}
                                    className="h-14 justify-center items-center"
                                >
                                    <Pressable onPress={() => router.push('/home')} className="">
                                        <Text className="text-white font-semibold">Sign In</Text>
                                    </Pressable>
                                </LinearGradient>
                            </BlurView>
                        </Pressable>

                        {/* Sign Up Link */}
                        <View className="flex-row justify-center mt-6">
                            <Text className={isDarkColorScheme ? 'text-gray-400' : 'text-gray-600'}>
                                Don't have an account?{' '}
                            </Text>
                            <Pressable onPress={() => router.push('/signup')}>
                                <Text className="text-primary font-semibold">Sign Up</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
} 
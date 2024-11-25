import * as React from 'react';
import { View, ScrollView, Pressable, Image, Dimensions, Platform } from 'react-native';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Calendar,
    MapPin,
    Users,
    Coins,
    ArrowLeft,
    Share2,
    Clock,
    CheckCircle2,
    Info,
    MessageCircle,
    Heart,
    Star,
    Shield,
    TreePine,
    Trophy
} from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'react-native';

const { width } = Dimensions.get('window');

// Mock event data - In real app, fetch this based on ID
const EVENT = {
    id: '1',
    title: 'Beach Cleanup',
    description: 'Join us for a community beach cleanup event! Help protect marine life and keep our beaches beautiful. All cleaning supplies will be provided. Don\'t forget to bring water and sun protection!',
    date: '2024-04-15',
    time: '09:00 AM',
    duration: '2 hours',
    participants: 15,
    maxParticipants: 30,
    location: {
        latitude: 25.7617,
        longitude: -80.1918,
        name: 'Miami Beach',
        address: '1001 Ocean Drive, Miami Beach, FL 33139'
    },
    reward: 200,
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    organizer: {
        name: 'Miami Green Initiative',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        verified: true,
        eventsHosted: 12
    },
    requirements: [
        'Wear comfortable clothes',
        'Bring water bottle',
        'Sun protection recommended',
        'Minimum age: 16+'
    ],
    participants_preview: [
        { id: '1', image: 'https://i.pravatar.cc/150?img=1' },
        { id: '2', image: 'https://i.pravatar.cc/150?img=2' },
        { id: '3', image: 'https://i.pravatar.cc/150?img=3' },
        { id: '4', image: 'https://i.pravatar.cc/150?img=4' },
    ],
    impact: {
        trees: 50,
        co2: "2.5 tons",
        participants_total: 450
    },
    badges: [
        { id: 1, title: 'Featured Event', icon: Star },
        { id: 2, title: 'High Impact', icon: Shield },
        { id: 3, title: 'Top Rated', icon: Trophy }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1618477388954-7852f32655ec',
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
        'https://images.unsplash.com/photo-1618477388954-7852f32655ec',
    ],
    rating: 4.8,
    reviews: 124,
    difficulty: 'Moderate',
};

const ParticipantsList = ({ participants }: { participants: typeof EVENT.participants_preview }) => {
    return (
        <View className="flex-row items-center">
            {participants.map((participant, index) => (
                <Image
                    key={participant.id}
                    source={{ uri: participant.image }}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{ marginLeft: index > 0 ? -12 : 0 }}
                />
            ))}
            <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center ml-[-12px]">
                <Text className="text-primary text-xs font-medium">+{EVENT.participants - participants.length}</Text>
            </View>
        </View>
    );
};

const Badge = ({ icon: Icon, title }: { icon: any, title: string }) => {
    return (
        <View className="flex-row items-center bg-white/10 rounded-full px-3 py-1.5 mr-2">
            <Icon size={14} className="text-primary mr-1" />
            <Text className="text-xs font-medium">{title}</Text>
        </View>
    );
};

const ImpactMetric = ({ icon: Icon, value, label }: { icon: any, value: string | number, label: string }) => {
    return (
        <View className="items-center flex-1">
            <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center mb-2">
                <Icon size={24} className="text-primary" fill="green" />
            </View>
            <Text className="text-lg font-bold">{value}</Text>
            <Text className="text-gray-500 text-sm">{label}</Text>
        </View>
    );
};

export default function EventDetailScreen() {
    const { isDarkColorScheme } = useColorScheme();
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [isJoining, setIsJoining] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(0);

    const handleJoinEvent = async () => {
        setIsJoining(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push(`/event/leaderboard/${id}` as any);
        } catch (error) {
            console.error('Error joining event:', error);
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <View className="flex-1">
            <StatusBar style="light" />

            {/* Header Image with Parallax */}
            <ScrollView className={isDarkColorScheme ? 'bg-black' : 'bg-zinc-50'}>
                <View className="h-96">
                    <ImageBackground
                        source={{ uri: EVENT.image }}
                        className="w-full h-full"
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.8)']}
                            className="absolute inset-0"
                        />

                        {/* Navigation Buttons */}
                        <View className="absolute top-12 left-6 right-6 flex-row justify-between">
                            <Pressable
                                onPress={() => router.back()}
                                className="bg-black/20 backdrop-blur-lg rounded-full p-2"
                            >
                                <ArrowLeft size={24} color="white" />
                            </Pressable>
                            <View className="flex-row space-x-3">
                                <Pressable
                                    onPress={() => setIsLiked(!isLiked)}
                                    className="bg-black/20 backdrop-blur-lg rounded-full p-2"
                                >
                                    <Heart
                                        size={24}
                                        color="white"
                                        fill={isLiked ? 'white' : 'transparent'}
                                    />
                                </Pressable>
                                <Pressable
                                    className="bg-black/20 backdrop-blur-lg rounded-full p-2"
                                >
                                    <Share2 size={24} color="white" />
                                </Pressable>
                            </View>
                        </View>

                        {/* Event Preview Info */}
                        <View className="absolute bottom-6 left-6 right-6">
                            <View className="flex-row flex-wrap mb-3">
                                {EVENT.badges.map(badge => (
                                    <Badge key={badge.id} icon={badge.icon} title={badge.title} />
                                ))}
                            </View>
                            <Text className="text-white text-3xl font-bold mb-2">
                                {EVENT.title}
                            </Text>
                            <View className="flex-row items-center space-x-4">
                                <View className="flex-row items-center">
                                    <Star size={16} color="#FFC107" fill="#FFC107" />
                                    <Text className="text-white ml-1">{EVENT.rating}</Text>
                                    <Text className="text-gray-300 ml-1">({EVENT.reviews})</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Shield size={16} color="white" />
                                    <Text className="text-white ml-1">{EVENT.difficulty}</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* Content */}
                <View className="-mt-6 rounded-t-3xl overflow-hidden">
                    <BlurView
                        intensity={isDarkColorScheme ? 40 : 60}
                        className="p-6"
                    >
                        {/* Impact Stats */}
                        <View className="flex-row justify-between bg-white/5 rounded-2xl p-6 mb-6">
                            <ImpactMetric
                                icon={TreePine}
                                value={EVENT.impact.trees}
                                label="Trees Saved"
                            />
                            <View className="h-full w-[1px] bg-gray-200" />
                            <ImpactMetric
                                icon={Users}
                                value={EVENT.impact.participants_total}
                                label="Participants"
                            />
                            <View className="h-full w-[1px] bg-gray-200" />
                            <ImpactMetric
                                icon={Coins}
                                value={EVENT.reward}
                                label="Coins Reward"
                            />
                        </View>


                        {/* Event Gallery 
            <View className="mb-6">
              <Text className="text-lg font-semibold mb-3">Event Gallery</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="flex-row"
              >
                {EVENT.gallery.map((image, index) => (
                  <Pressable 
                    key={index}
                    onPress={() => setSelectedImage(index)}
                    className="mr-3"
                  >
                    <Image
                      source={{ uri: image }}
                      className={`w-24 h-24 rounded-xl ${
                        selectedImage === index ? 'border-2 border-primary' : ''
                      }`}
                    />
                  </Pressable>
                ))}
              </ScrollView>
            </View>
                */}
                        {/* Event Type & Reward */}
                        <View className="flex-row justify-between items-center">
                            <View className="bg-primary/10 rounded-full px-4 py-1">
                                <Text className="text-primary font-medium">Environmental</Text>
                            </View>
                            <View className="flex-row items-center bg-primary/10 rounded-full px-4 py-1">
                                <Coins size={16} className="text-primary mr-1" />
                                <Text className="text-primary font-medium">{EVENT.reward} coins</Text>
                            </View>
                        </View>

                        {/* Title & Description */}
                        <Text className="text-2xl font-bold mt-4">{EVENT.title}</Text>
                        <Text className="text-gray-500 mt-2 leading-6">{EVENT.description}</Text>

                        {/* Key Information */}
                        <View className="bg-primary/5 rounded-xl p-4 mt-6">
                            <View className="flex-row items-center mb-3">
                                <Calendar size={20} className="text-primary mr-3" />
                                <View>
                                    <Text className="font-semibold">{EVENT.date}</Text>
                                    <Text className="text-gray-500 text-sm">{EVENT.time}</Text>
                                </View>
                            </View>
                            <View className="flex-row items-center mb-3">
                                <Clock size={20} className="text-primary mr-3" />
                                <Text className="text-gray-500">Duration: {EVENT.duration}</Text>
                            </View>
                            <View className="flex-row items-center">
                                <MapPin size={20} className="text-primary mr-3" />
                                <View>
                                    <Text className="font-semibold">{EVENT.location.name}</Text>
                                    <Text className="text-gray-500 text-sm">{EVENT.location.address}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Organizer */}
                        <View className="mt-6">
                            <Text className="text-lg font-semibold mb-3">Event Organizer</Text>
                            <View className="flex-row items-center bg-white/50 rounded-xl p-4">
                                <Image
                                    source={{ uri: EVENT.organizer.image }}
                                    className="w-12 h-12 rounded-full"
                                />
                                <View className="flex-1 ml-3">
                                    <View className="flex-row items-center">
                                        <Text className="font-semibold">{EVENT.organizer.name}</Text>
                                        {EVENT.organizer.verified && (
                                            <CheckCircle2 size={16} className="text-primary ml-1" />
                                        )}
                                    </View>
                                    <Text className="text-gray-500 text-sm">
                                        {EVENT.organizer.eventsHosted} events hosted
                                    </Text>
                                </View>
                                <Pressable className="bg-primary/10 rounded-full p-2">
                                    <MessageCircle size={20} className="text-primary" />
                                </Pressable>
                            </View>
                        </View>

                        {/* Requirements */}
                        <View className="mt-6">
                            <Text className="text-lg font-semibold mb-3">Requirements</Text>
                            <View className="bg-white/50 rounded-xl p-4">
                                {EVENT.requirements.map((req, index) => (
                                    <View key={index} className="flex-row items-center mb-2 last:mb-0">
                                        <Info size={16} className="text-primary mr-2" />
                                        <Text className="text-gray-600">{req}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Participants */}
                        <View className="mt-6">
                            <Text className="text-lg font-semibold mb-3">Participants</Text>
                            <View className="bg-white/50 rounded-xl p-4 flex-row items-center justify-between">
                                <ParticipantsList participants={EVENT.participants_preview} />
                                <View className="flex-row items-center">
                                    <Users size={16} className="text-gray-500 mr-1" />
                                    <Text className="text-gray-500">
                                        {EVENT.participants}/{EVENT.maxParticipants} joined
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Map */}
                        <View className="mt-6 mb-20">
                            <Text className="text-lg font-semibold mb-3">Location</Text>
                            <View className="rounded-xl overflow-hidden h-48">
                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    style={{ width: '100%', height: '100%' }}
                                    initialRegion={{
                                        ...EVENT.location,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                    }}
                                    scrollEnabled={false}
                                >
                                    <Marker coordinate={EVENT.location} />
                                </MapView>
                            </View>
                        </View>

                        {/* New Reviews Preview Section */}
                        <View className="mt-4 mb-20">
                            <View className="flex-row justify-between items-center mb-3">
                                <Text className="text-lg font-semibold">Reviews</Text>
                                <Pressable>
                                    <Text className="text-primary">See all</Text>
                                </Pressable>
                            </View>
                            <View className="bg-white/50 rounded-xl p-4">
                                <View className="flex-row items-center mb-3">
                                    <Image
                                        source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <View className="flex-1">
                                        <Text className="font-semibold">Sarah Johnson</Text>
                                        <View className="flex-row items-center">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star
                                                    key={star}
                                                    size={12}
                                                    className="text-yellow-400 mr-0.5"
                                                    fill={star <= 5 ? '#FFC107' : 'transparent'}
                                                />
                                            ))}
                                            <Text className="text-gray-500 text-xs ml-2">2 days ago</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text className="text-gray-600">
                                    Amazing experience! The organizers were well-prepared and the impact we made was truly visible.
                                </Text>
                            </View>
                        </View>
                    </BlurView>
                </View>
            </ScrollView>

            {/* Enhanced Bottom Action Bar */}
            <View
                className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white rounded-t-3xl"
            >
                <View className="p-4">
                    <View className="flex-row items-center justify-between mb-3">
                        <View className="flex-row items-center">
                            <Users size={20} className="text-gray-500 mr-2" />
                            <Text className="text-gray-500">
                                Join {EVENT.participants} others
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <Clock size={20} className="text-gray-500 mr-2" />
                            <Text className="text-gray-500">{EVENT.duration}</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-between">
                        <View>
                            <Text className="text-gray-500">Available Spots</Text>
                            <Text className="text-xl font-bold">
                                {EVENT.maxParticipants - EVENT.participants} spots left
                            </Text>
                        </View>
                        <Pressable
                            onPress={handleJoinEvent}
                            disabled={isJoining}
                        >
                            <LinearGradient
                                colors={['#22c55e', '#16a34a']}
                                className="px-8 py-4 rounded-full"
                                style={{ opacity: isJoining ? 0.7 : 1 }}
                            >
                                <Text className="text-white font-semibold text-lg">
                                    {isJoining ? 'Joining...' : 'Join Event'}
                                </Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
} 
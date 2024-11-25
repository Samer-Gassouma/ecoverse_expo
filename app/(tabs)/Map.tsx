import * as React from 'react';
import { View, Dimensions, Pressable, StyleSheet, Platform, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { BlurView } from 'expo-blur';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, MapStyleElement, Polyline } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Calendar, Users, MapPin, Navigation, ChevronRight, Award, Clock } from 'lucide-react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

// Custom Map Styles
const darkMapStyle: MapStyleElement[] = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#242f3e' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#746855' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#242f3e' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
];

const lightMapStyle: MapStyleElement[] = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ffffff' }, { lightness: 17 }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }, { lightness: 18 }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }, { lightness: 16 }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }, { lightness: 21 }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#dedede' }, { lightness: 21 }],
  },
];

// Mock data for events with distance calculation
const EVENTS = [
  {
    id: '1',
    title: 'Beach Cleanup',
    description: 'Help clean up Miami Beach',
    date: '2024-04-15',
    time: '09:00 AM',
    participants: 15,
    maxParticipants: 30,
    location: {
      latitude: 25.7617,
      longitude: -80.1918,
      name: 'Miami Beach'
    },
    reward: 200,
    type: 'cleanup',
  },
  {
    id: '2',
    title: 'Tree Planting',
    description: 'Community tree planting event',
    date: '2024-04-20',
    time: '10:00 AM',
    participants: 8,
    maxParticipants: 20,
    location: {
      latitude: 25.7827,
      longitude: -80.2094,
      name: 'Downtown Miami'
    },
    reward: 150,
    type: 'planting',
  },
];

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI/180);
};

const EventMarker = ({ 
  event, 
  isSelected,
  userLocation,
  onEventSelect 
}: { 
  event: typeof EVENTS[0],
  isSelected: boolean,
  userLocation: Location.LocationObject | null,
  onEventSelect: (event: typeof EVENTS[0]) => void
}) => {
  const { isDarkColorScheme } = useColorScheme();

  const distance = userLocation ? calculateDistance(
    userLocation.coords.latitude,
    userLocation.coords.longitude,
    event.location.latitude,
    event.location.longitude
  ).toFixed(1) : null;

  return (
    <>
      <Marker
        coordinate={event.location}
        onPress={() => onEventSelect(event)}
      >
        {isSelected ? (
          // Selected Event Pin
          <View className="items-center">
            <View className="bg-primary rounded-lg px-3 py-1 mb-2">
              <Text className="text-white text-xs font-medium">{event.title}</Text>
            </View>
            <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
              <MapPin size={14} color="white" />
            </View>
            <View 
              className="w-2 h-2 bg-primary rotate-45 -mt-1"
              style={{ transform: [{ rotate: '45deg' }] }}
            />
          </View>
        ) : (
          // Normal Event Marker
          <BlurView intensity={60} className="rounded-2xl overflow-hidden">
            <LinearGradient
              colors={['#22c55e', '#16a34a']}
              className="px-3 py-2"
            >
              <View className="flex-row items-center">
                <MapPin size={16} color="white" />
                <Text className="text-white text-xs ml-1 font-medium">{event.type}</Text>
              </View>
            </LinearGradient>
          </BlurView>
        )}
      </Marker>

      {/* Draw line from user to selected event */}
      {isSelected && userLocation && (
        <Polyline
          coordinates={[
            {
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            },
            event.location
          ]}
          strokeColor="#22c55e"
          strokeWidth={2}
          lineDashPattern={[5, 5]}
        />
      )}

      {/* Callout only for non-selected events */}
      {!isSelected && (
        <Callout tooltip onPress={() => onEventSelect(event)}>
          <BlurView intensity={isDarkColorScheme ? 40 : 60} className="rounded-lg overflow-hidden">
            <View className="p-3 w-64">
              <Text className="font-semibold text-base">{event.title}</Text>
              <Text className="text-gray-600 text-sm mt-1">{event.description}</Text>
              <View className="flex-row items-center mt-2">
                <Calendar size={14} className="text-gray-500 mr-1" />
                <Text className="text-sm text-gray-500">{event.date}</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Users size={14} className="text-gray-500 mr-1" />
                <Text className="text-sm text-gray-500">
                  {event.participants}/{event.maxParticipants} participants
                </Text>
              </View>
              {distance && (
                <View className="flex-row items-center mt-1">
                  <Navigation size={14} className="text-gray-500 mr-1" />
                  <Text className="text-sm text-gray-500">{distance} km away</Text>
                </View>
              )}
            </View>
          </BlurView>
        </Callout>
      )}
    </>
  );
};

const CategoryPill = ({ label, isActive, onPress }: { label: string, isActive: boolean, onPress: () => void }) => {
  return (
    <Pressable 
      onPress={onPress}
      className={`rounded-full px-4 py-2 mr-2 ${
        isActive ? 'bg-primary' : 'bg-primary/10'
      }`}
    >
      <Text className={`text-sm font-medium ${
        isActive ? 'text-white' : 'text-primary'
      }`}>
        {label}
      </Text>
    </Pressable>
  );
};

const EventCard = ({ 
  event, 
  distance,
  onPress,
  compact = false 
}: { 
  event: typeof EVENTS[0],
  distance?: string,
  onPress: () => void,
  compact?: boolean
}) => {
  const { isDarkColorScheme } = useColorScheme();
  
  return (
    <Pressable 
      onPress={onPress}
      className={`${
        compact ? 'bg-primary/5' : 'bg-white/80'
      } rounded-xl p-4 mb-3`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <View className="flex-row items-center">
            <View className={`w-2 h-2 rounded-full ${
              event.type === 'cleanup' ? 'bg-blue-500' : 'bg-green-500'
            } mr-2`} />
            <Text className="text-xs text-gray-500 uppercase">{event.type}</Text>
          </View>
          <Text className="font-semibold text-base mt-1">{event.title}</Text>
          {!compact && (
            <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>
              {event.description}
            </Text>
          )}
        </View>
        {distance && (
          <View className="bg-primary/10 px-3 py-1 rounded-full">
            <Text className="text-primary text-xs">{distance} km</Text>
          </View>
        )}
      </View>
      
      <View className="flex-row items-center justify-between mt-3">
        <View className="flex-row items-center">
          <Clock size={14} className="text-gray-500 mr-1" />
          <Text className="text-gray-500 text-sm">{event.time}</Text>
          <View className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
          <Users size={14} className="text-gray-500 mr-1" />
          <Text className="text-gray-500 text-sm">
            {event.participants}/{event.maxParticipants}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Award size={14} className="text-primary mr-1" />
          <Text className="text-primary text-sm font-medium">
            {event.reward} coins
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default function MapScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const [userLocation, setUserLocation] = React.useState<Location.LocationObject | null>(null);
  const [selectedEvent, setSelectedEvent] = React.useState<typeof EVENTS[0] | null>(null);
  const [nearbyEvents, setNearbyEvents] = React.useState(EVENTS);
  const mapRef = React.useRef<MapView>(null);
  const [activeCategory, setActiveCategory] = React.useState('all');
  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'cleanup', label: 'Cleanup' },
    { id: 'planting', label: 'Planting' },
    { id: 'education', label: 'Education' },
  ];

  // Get user location
  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      
      // Update region to user's location
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }

      // Filter nearby events (within 50km)
      const nearby = EVENTS.filter(event => {
        const distance = calculateDistance(
          location.coords.latitude,
          location.coords.longitude,
          event.location.latitude,
          event.location.longitude
        );
        return distance <= 10050; 
      });
      setNearbyEvents(nearby);
    })();
  }, []);

  const handleEventSelect = (event: typeof EVENTS[0]) => {
    setSelectedEvent(event);
    
    // Animate map to selected event
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: event.location.latitude,
        longitude: event.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        showsUserLocation
        showsMyLocationButton
        customMapStyle={isDarkColorScheme ? darkMapStyle : lightMapStyle}
        mapPadding={{ top: 140, right: 0, bottom: selectedEvent ? 220 : 320, left: 0 }}
      >
        {nearbyEvents.map((event) => (
          <EventMarker 
            key={event.id} 
            event={event}
            isSelected={selectedEvent?.id === event.id}
            userLocation={userLocation}
            onEventSelect={handleEventSelect}
          />
        ))}
      </MapView>

      {/* Search and Filters */}
      <View className="absolute top-12 left-6 right-6 space-y-3">
        {/* Search Bar */}
        <BlurView intensity={isDarkColorScheme ? 40 : 60} className="rounded-xl overflow-hidden">
          <View className="p-4 flex-row items-center">
            <View className="flex-1 flex-row items-center bg-white/10 rounded-lg p-2">
              <Search size={18} className="text-gray-500 mr-2" />
              <Text className="text-gray-500">Search for events...</Text>
            </View>
            <Pressable className="ml-3 bg-primary/10 rounded-lg p-2">
              <Filter size={18} className="text-primary" />
            </Pressable>
          </View>
        </BlurView>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <CategoryPill
              key={category.id}
              label={category.label}
              isActive={activeCategory === category.id}
              onPress={() => setActiveCategory(category.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Selected Event View */}
      {selectedEvent ? (
        <View className="absolute bottom-8 left-6 right-6">
          <BlurView intensity={isDarkColorScheme ? 40 : 60} className="rounded-xl overflow-hidden">
            <View className="p-4">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1">
                  <Text className="text-2xl font-bold">{selectedEvent.title}</Text>
                  <Text className="text-gray-500 mt-1">{selectedEvent.location.name}</Text>
                </View>
                <Pressable 
                  onPress={() => setSelectedEvent(null)}
                  className="bg-gray-100 rounded-full p-2"
                >
                  <Text className="text-primary">×</Text>
                </Pressable>
              </View>

              <View className="flex-row items-center justify-between bg-primary/5 rounded-xl p-3 mb-4">
                <View className="flex-row items-center">
                  <Calendar size={16} className="text-gray-500 mr-2" />
                  <Text className="text-gray-500">{selectedEvent.date}</Text>
                </View>
                <View className="flex-row items-center">
                  <Users size={16} className="text-gray-500 mr-2" />
                  <Text className="text-gray-500">
                    {selectedEvent.participants}/{selectedEvent.maxParticipants}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Award size={16} className="text-primary mr-2" />
                  <Text className="text-primary font-medium">{selectedEvent.reward}</Text>
                </View>
              </View>

              <Pressable 
                onPress={() => router.push(`/event/${selectedEvent.id}` as any)}
                className="bg-primary rounded-xl py-3 px-4 flex-row items-center justify-between"
              >
                <Text className="text-white font-semibold text-lg">Join Event</Text>
                <ChevronRight size={20} color="white" />
              </Pressable>
            </View>
          </BlurView>
        </View>
      ) : (
        // Nearby Events List
        <View className="absolute bottom-8 left-6 right-6">
          <BlurView intensity={isDarkColorScheme ? 40 : 60} className="rounded-xl overflow-hidden">
            <View className="p-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold">Nearby Events</Text>
                <View className="flex-row items-center">
                  <Navigation size={14} className="text-primary mr-1" />
                  <Text className="text-primary">Sort by distance</Text>
                </View>
              </View>
              
              <ScrollView 
                className="max-h-[280px]"
                showsVerticalScrollIndicator={false}
              >
                {nearbyEvents.map((event) => {
                  const distance = userLocation ? calculateDistance(
                    userLocation.coords.latitude,
                    userLocation.coords.longitude,
                    event.location.latitude,
                    event.location.longitude
                  ).toFixed(1) : null;

                  return (
                    <EventCard
                      key={event.id}
                      event={event}
                      distance={distance || undefined}
                      onPress={() => handleEventSelect(event)}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </BlurView>
        </View>
      )}
    </View>
  );
}

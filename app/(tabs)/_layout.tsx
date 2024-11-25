import { Tabs } from 'expo-router';
import { Home, Leaf, Users, Trophy, Settings, Map } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';

export default function TabsLayout() {
  const { isDarkColorScheme } = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkColorScheme ? '#000' : '#fff',
          borderTopColor: isDarkColorScheme ? '#262626' : '#e5e7eb',
        },
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: isDarkColorScheme ? '#6b7280' : '#9ca3af',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="initiatives"
        options={{
          title: 'Initiatives',
          tabBarIcon: ({ color, size }) => <Leaf size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Achievements',
          tabBarIcon: ({ color, size }) => <Trophy size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
} 
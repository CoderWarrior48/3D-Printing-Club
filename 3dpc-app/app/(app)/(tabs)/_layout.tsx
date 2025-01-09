import { Icon } from "@/components/ui/icon";
import { Tabs } from "expo-router";
import { Calendar, CircleUser, Clock9, Disc3, QrCode } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffd33d",
        tabBarStyle: {
          backgroundColor: "#25292e",
        }, 
        tabBarLabel: '', // Remove titles globally
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon as={CircleUser} size="lg" color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon as={Clock9} size="lg" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meeting"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon as={QrCode} size="lg" color={color}/>
          ),
        }}
      />
       <Tabs.Screen
        name="request"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon as={Disc3} size="lg" color={color}/>
          ),
        }}
      />
       <Tabs.Screen
        name="calender"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon as={Calendar} size="lg" color={color}/>
          ),
        }}
      />
    </Tabs>
  );
}

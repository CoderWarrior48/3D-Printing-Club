import { useAuth } from "@/app/AuthProvider";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { router, Tabs, useRouter } from "expo-router";
import { Calendar, CircleUser, Clock9, Disc3, LayoutGrid, QrCode } from "lucide-react-native";
import { Pressable, View, Text, SafeAreaView } from "react-native";

export default function TabLayout() {
  const { userState } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Header Section */}
        <HStack className="pt-4 pr-10 pb-3 bg-background-0 items-center justify-between border-b border-border-300">
          <HStack className="items-center">
            <Icon as={LayoutGrid} size="lg" className="mx-5" />
            <Text className="text-2xl">3D Printing Club</Text>
          </HStack>
          <Pressable onPress={() => router.push("/profile")}>
            <Avatar className="h-9 w-9">
              <AvatarFallbackText className="font-light">
                {userState?.firstName + " " + userState?.lastName}
              </AvatarFallbackText>
            </Avatar>
          </Pressable>
        </HStack>

        {/* Tabs Section - Takes up remaining space */}
        <View style={{ flex: 1 }}>
          <Tabs
            screenOptions={{
              headerShown: false,
              headerPressOpacity: 0,
              tabBarLabel: "", // Remove titles globally
              tabBarActiveTintColor: '#2ecc71'
            }}
          >
            <Tabs.Screen
              name="profile"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Icon as={CircleUser} size="xl" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="schedule"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Icon as={Clock9} size="xl" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="meeting"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Icon as={QrCode} size="xl" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="request"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Icon as={Disc3} size="xl" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="calender"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Icon as={Calendar} size="xl" color={color} />
                ),
              }}
            />
          </Tabs>
        </View>
      </View>
    </SafeAreaView>
  );
}

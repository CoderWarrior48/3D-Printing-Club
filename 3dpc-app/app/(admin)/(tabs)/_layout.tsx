import { useAuth } from "@/app/AuthProvider";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { router, Tabs, useRouter } from "expo-router";
import { Calendar, CircleUser, Disc3, LayoutGrid, SettingsIcon, Shield } from "lucide-react-native";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';

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
          <Menu
            placement="bottom" 
            offset={-20}
            onSelectionChange={(keys) => {
              if (keys.currentKey === "Profile") {
                router.push("/profile")
              }
            }}
            trigger={({ ...triggerProps }) => {
              return (
                <Pressable {...triggerProps}>
                  <Avatar className="h-9 w-9">
                    <AvatarFallbackText className="font-light">
                      {userState?.firstName + " " + userState?.lastName}
                    </AvatarFallbackText>
                  </Avatar>
                </Pressable>
              );
            }}
          >
            <MenuItem key="Profile" textValue="Profile">
              <Icon as={CircleUser} size="sm" className="mr-2" />
              <MenuItemLabel size="sm">Profile</MenuItemLabel>
            </MenuItem>
            <MenuItem key="Settings" textValue="Settings" onSelect={() => router.push("/settings")}>
              <Icon as={SettingsIcon} size="sm" className="mr-2" />
              <MenuItemLabel size="sm">Settings</MenuItemLabel>
            </MenuItem>
            <MenuItem key="Logout" textValue="Logout" onSelect={() => console.log('Logout')}>
              <Icon as={Disc3} size="sm" className="mr-2" />
              <MenuItemLabel size="sm">Logout</MenuItemLabel>
            </MenuItem>
          </Menu>
        </HStack>

        {/* Tabs Section - Takes up remaining space */}
        <View style={{ flex: 1 }}>
          <Tabs
            screenOptions={{
              headerShown: false,
              headerPressOpacity: 0,
              tabBarLabel: "", // Remove titles globally
            }}
          >
            <Tabs.Screen
              name="dashboard"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Icon as={Shield} size="xl" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="manageMeetings"
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

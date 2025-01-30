import { useAuth } from '@/app/AuthProvider';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Switch } from '@/components/ui/switch';
import { VStack } from '@/components/ui/vstack';
import React, { useState } from 'react';
import { Text, View } from 'react-native';


const SettingsScreen = () => {
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

    const toggleNotifications = () => setIsNotificationsEnabled(prevState => !prevState);
    const toggleDarkMode = () => setIsDarkModeEnabled(prevState => !prevState);

    const { onLogout } = useAuth()

    return (
        <View className="flex-1 p-4">
            <Text className="text-2xl font-bold mb-4">Settings</Text>
            <VStack className="space-y-3">
                <HStack className="justify-between items-center py-3">
                    <Text className="text-lg">Enable Notifications</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleNotifications}
                        value={isNotificationsEnabled}
                        className="form-switch"
                    />
                </HStack>
                <HStack className="justify-between items-center py-3">
                    <Text className="text-lg">Dark Mode</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isDarkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleDarkMode}
                        value={isDarkModeEnabled}
                        className="form-switch"
                    />
                </HStack>
                <Button onPress={() => onLogout}><ButtonText>Logout</ButtonText></Button>
            </VStack>
        </View>
    );
};

export default SettingsScreen;

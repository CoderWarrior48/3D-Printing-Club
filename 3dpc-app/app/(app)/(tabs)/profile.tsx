import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Icon, ChevronLeftIcon, SettingsIcon } from "@/components/ui/icon";
import { router, useRouter } from "expo-router";
import {  Pressable, Text } from "react-native";
import { Center } from "@/components/ui/center";
import { Avatar, AvatarBadge, AvatarFallbackText } from "@/components/ui/avatar";
import { useAuth } from "@/app/AuthProvider";
import { House, LayoutGrid, MenuIcon, Shield } from "lucide-react-native";
import axios from "axios";
import { Button, ButtonText } from "@/components/ui/button";

export default function Profile() {
    const { userState } = useAuth()
   

    return (
      <VStack>
    <Center className="h-80 border">
      <Avatar className="h-9 w-9">
        <AvatarFallbackText>{userState?.firstName +" "+userState?.lastName}</AvatarFallbackText>
        <AvatarBadge className="bg-blue-500">
          <Shield></Shield>
        </AvatarBadge>
      </Avatar>
      <Text>Name: {userState?.firstName}{userState?.lastName} role: {userState?.role}</Text>
    </Center>
    <Button onPress={test}><ButtonText>Test</ButtonText></Button>
    </VStack>
    )
}
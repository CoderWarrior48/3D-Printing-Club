import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { HStack } from "@/components/ui/hstack";
import { Icon, ChevronLeftIcon, SettingsIcon } from "@/components/ui/icon";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";

export default function Profile() {
    return (
        <HStack
      className="py-6 px-4 border-b border-border-300 bg-background-0 items-center justify-between"
      space="md"
    >
      <HStack className="items-center" space="sm">
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Icon as={ChevronLeftIcon} />
        </Pressable>
        <Text className="text-xl">Title</Text>
      </HStack>
      <Icon as={SettingsIcon} className="h-8 w-20" />
    </HStack>
    )
}
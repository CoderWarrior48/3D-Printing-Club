import { Avatar, AvatarImage, AvatarBadge, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import axios from "axios";
import { Timer } from "lucide-react-native";
import { Text, View, ScrollView } from "react-native";

export default function Dashboard() {
  // test()
  return (
    <ScrollView>
      <VStack className="items-center w-full max-w-xl">
        <Box className="w-full h-80 bg-background-200"></Box>
        <Center className="w-full absolute top-10">
          <Avatar size="2xl" className="bg-primary-600">
            <AvatarFallbackText size="2xl">Ben Frank</AvatarFallbackText>
            <AvatarBadge />
          </Avatar>
          <Heading size="2xl" className="mt-4">Ben Frank</Heading>
          <Text>Admin</Text>
        </Center>
    
        <VStack className="m-3 w-full max-w-xl">
          <Heading size="2xl" className="m-5">Today</Heading>
          <VStack className="gap-2">
            <Card size="md" variant="elevated" className="m-3">
              <Heading size="md" className="mb-1">New User</Heading>
              <Text>Name: John Doe</Text>
              <HStack className="items-center mt-10">
                <Icon as={Timer} />
                <Text>Mon 25 - 5:00 pm</Text>
              </HStack>
            </Card>

            <Card size="md" variant="elevated" className="m-3">
              <Heading size="md" className="mb-1">Football Fundraiser</Heading>
              <Text>Selling fidget toys and new cu.</Text>
              <HStack className="items-center mt-10">
                <Icon as={Timer} />
                <Text>Mon 25 - 5:00 pm</Text>
              </HStack>
            </Card>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}

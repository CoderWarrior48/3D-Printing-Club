import { useAuth } from "@/app/AuthProvider";
import { Avatar, AvatarImage, AvatarBadge, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import axios from "axios";
import { Timer } from "lucide-react-native";
import { View, ScrollView, Text } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';


export default function Profile() {
  const { userState } = useAuth()
  // test()
  return (
    <ScrollView
    decelerationRate={0.9}
    snapToInterval={330}
    snapToEnd={false}
    >
      <VStack className="items-center w-full max-w-xl">
        <Box className="w-full h-[325] bg-background-200"></Box>
        <Center className="w-full absolute top-10">
          <Avatar size="2xl" className="bg-primary-600">
            <AvatarFallbackText size="2xl">{userState?.firstName} {userState?.lastName}</AvatarFallbackText>
            <AvatarBadge />
          </Avatar>
          <Heading size="2xl" className="mt-4">{userState?.firstName} {userState?.lastName}</Heading>
          <Text>General Member</Text>
          <HStack className="m-5 items-center gap-1">
          <VStack className="items-center py-3 px-4" space="xs">
            <Text className="text-dark font-roboto font-bold text-2xl">
              5
            </Text>
            <Text className="text-dark font-roboto text-xl">
              Meetings
            </Text>
          </VStack>
          <Divider orientation="vertical" className="h-20 bg-background-300" />
          <VStack className="items-center py-3 px-4" space="xs">
            <Text className="text-dark font-roboto font-bold text-2xl">
              5
            </Text>
            <Text className="text-dark font-roboto text-xl">
              Workshops
            </Text>
          </VStack>
          <Divider orientation="vertical" className="h-20 bg-background-300" />
          <VStack className="items-center py-3 px-4" space="xs">
            <Text className="text-dark font-roboto font-bold text-2xl">
              2
            </Text>
            <Text className="text-dark font-roboto text-xl">
              Fundraisers
            </Text>
          </VStack>
          <Divider orientation="vertical" className="h-20 bg-background-300" />
        </HStack>
        </Center>

       

        <Center className="m-20">
          <CircularProgress
            value={60}
            radius={100}
            duration={2000}
            // progressValueColor={'#ecf0f1'}
            maxValue={200}
            title={'Points'}
            // titleColor={'white'}
            titleStyle={{ fontWeight: 'bold' }}
          />
          <Heading size="xl" className="mt-20 w-80">40 more to go to become an Advanced member! </Heading>
          <Card className="w-90">
            <Text>Attend workshops!</Text>
          </Card>
          <Card className="w-90">
            <Text>Volunteer time with printers!</Text>
          </Card>
          <Card className="w-90">
            <Text>Participate in fundraising and community outreach!</Text>
          </Card>
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

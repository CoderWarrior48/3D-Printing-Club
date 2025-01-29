import { useAuth } from "@/app/AuthProvider";
import { Avatar, AvatarImage, AvatarBadge, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
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
import { Image } from "expo-image";
import QRCodeStyled from 'react-native-qrcode-styled';
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Profile() {
  const { userState } = useAuth()
  const [points, setPoints] = useState(20);
  const router = useRouter()


  return (
    <ScrollView
    // decelerationRate={0.9}
    // snapToInterval={330}
    // snapToEnd={false}
    >
      <VStack className="items-center w-full max-w-xl">
        <Box className="w-full h-[500] bg-background-200"></Box>
        <Center className="w-full absolute top-10">


          <Center className="m-10">
            <CircularProgress
              value={points}
              radius={100}
              delay={1000}

              duration={2000}
              // progressValueColor={'#ecf0f1'}
              maxValue={200}
              title={'Points'}
              // titleColor={'white'}
              titleStyle={{ fontWeight: 'bold' }}
            />
          </Center>
          <Heading size="2xl" className="mt-4">{userState?.firstName} {userState?.lastName}</Heading>
          <Text>General Member</Text>

          <HStack className="m-5 items-center gap-1">
            <VStack className="items-center py-3 px-4" space="xs">
              <Text className="text-dark font-roboto font-bold text-2xl">
                5
              </Text>
              <Text className="text-dark font-roboto text-xl">
                Workshops
              </Text>
            </VStack>
            <Divider orientation="vertical" className="h-20 bg-background-400" />
            <VStack className="items-center py-3 px-4" space="xs">
              <Text className="text-dark font-roboto font-bold text-2xl">
                5
              </Text>
              <Text className="text-dark font-roboto text-xl">
                Meetings
              </Text>
            </VStack>
            <Divider orientation="vertical" className="h-20 bg-background-400" />
            <VStack className="items-center py-3 px-4" space="xs">
              <Text className="text-dark font-roboto font-bold text-2xl">
                2
              </Text>
              <Text className="text-dark font-roboto text-xl">
                Fundraisers
              </Text>
            </VStack>
            <Divider orientation="vertical" className="h-20 bg-background-400" />
          </HStack>
        </Center>
        <Center className="p-10">
          <Heading size="xl" className="m-15 w-80">{100 - points} more to go to become an</Heading>
          <Heading size="2xl" className="text-primary-500">Advanced member</Heading>
        </Center>
        <VStack className="p-5 gap-5">
          <Card>
            <Center>
              <QRCodeStyled
                data={'Simple QR Code'}
                padding={20}
                pieceSize={8}
                pieceLiquidRadius={2}
              /></Center>
            <Heading size="xl" className="mb-4">Attend your first meeting</Heading>
            <Text className="text-lg mb-5">
              Navigate to the scan tab and hold your phone up to the events qrcode or enter manually
            </Text>
            <Button onPress={() => { router.push("/meeting") }}>
              <ButtonText size="lg">Scan</ButtonText>
            </Button>

          </Card>
          <Card>
            <Heading size="xl" className="mb-4">Volunteer time with the printers</Heading>
            <Text className="text-lg mb-5">
              The best way to learn 3D printing is getting hands on experience. Schedule time to come help with printer maintance, post-proccessing prints, and starting new prints!
            </Text>
            <Button onPress={() => { router.push("/schedule") }}>
              <ButtonText size="lg">Schedule now</ButtonText>
            </Button>

          </Card>
          <Card>
            <Heading size="xl" className="mb-4">Participate in events</Heading>
            <Text className="text-lg mb-5">
              To join us for fundraising, public outreach, and more, head right over to the calender.
            </Text>
            <Button onPress={() => { router.push("/calender") }}>
              <ButtonText size="lg">Calendar</ButtonText>
            </Button>
          </Card>
        </VStack>

      </VStack>
    </ScrollView>
  );
}

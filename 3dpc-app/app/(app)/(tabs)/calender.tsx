import { useAuth } from "@/app/AuthProvider";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import axios from "axios";

import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Calender() {
    const [loading, setLoading] = useState(true);
    const [attendance, setAttendance] = useState([]);
    const { userState } = useAuth()

    useEffect(() => {
        const get_attendance = async () => {
            const response = await axios.post("https://dawson.hamera.com/api/get_attendance.php",{user_id:userState?.user_id})
            setAttendance(response.data)
            setLoading(false)
        }
        get_attendance()
    }, [])

    if (loading) {
        return <Text>Loading...</Text>
    }

    return (
        <VStack space="md" className="w-full">
            <Center className="mt-20">
                <Heading size="2xl">Attended</Heading>
            </Center>
        {attendance.map((event) => {

          return (
          
          <VStack space="md" className="w-full rounded-md border border-background-200 p-4" >
            <Box className="border-2 rounded-md bg-background-200 p-4">
              <HStack>
                <VStack className="w-2/3">
                  <Text>{event.start_time} MIN</Text>
                    <Heading size="xl">{event.event_name}</Heading>
                  <Text>12:11 - 12:44</Text>
                  {/* <HStack>
                    {item.tags.map((tag) => {
                      return (
                      <Box className="p-2 border-2 rounded-md bg-primary-100 m-3 ml-0">
                        <Text className="text-white">{tag}</Text>
                      </Box>
                      )
                    })}
                  </HStack> */}
                </VStack>
                <VStack className="">
                  <Avatar size="xl">
                    <AvatarFallbackText>{event.event_id}</AvatarFallbackText>
                  </Avatar>
                </VStack>
              </HStack>
                <Button disabled={true}><ButtonText>Scheduled by Jane Doe</ButtonText></Button>
            </Box>
          </VStack>
        )
        })}
      </VStack>
  )
}
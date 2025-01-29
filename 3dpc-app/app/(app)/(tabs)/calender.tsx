import { useAuth } from "@/app/AuthProvider";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import axios from "axios";
import { useFocusEffect } from "expo-router";

import React, { useEffect, useState } from "react";
import { View, Text, RefreshControl } from "react-native";
import { ScrollView } from "react-native";

export default function Calender() {
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [events, setEvents] = useState([]);
  const { userState } = useAuth()

  const get_events = async () => {
    const attendance = await axios.post("https://dawson.hamera.com/api/get_attendance.php", { user_id: userState?.user_id });
    const events = await axios.get("https://dawson.hamera.com/api/get_events.php");
    const attendedEvents = attendance.data.map((event: any) => event.event_id)
    console.log("D",attendance.data)
    setAttendance(attendedEvents)
    setEvents(events.data)
    setLoading(false)
  }

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true)
      get_events();
    }, [])
  );

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={loading} onRefresh={get_events} />
    }
    >
    <VStack space="md" className="w-full">
      <Center className="mt-20">
        <Heading size="2xl">Calender</Heading>
      </Center>
      {events.splice(0,5).map((event) => {
        // const start = event.start_time.split(" ")
        // const end = event.end_time.split(" ")
        console.log(attendance.includes(event.event_id), event.event_id, attendance)
        return (

            
            <Card className={attendance.includes(event.event_id) ? 'm-6 border border-2 border-primary-200' : 'm-6 border'} key={event.event_id}>

                <VStack className="w-2/3">
                  {/* <Text>{start[0]}</Text> */}
                  <Heading size="xl">{event.event_name}</Heading>
                  <Text>{event.location}</Text>
                  <Text>{event.details}</Text>
                  <Text className="font-bold">Scheduled by {event.scheduled_by}</Text>
                </VStack>

        

              {/* <Button disabled={true}><ButtonText>Scheduled by {event.scheduled_by}</ButtonText></Button> */}
           </Card>
  
        )
      })}
    </VStack>
    </ScrollView>
  )
}
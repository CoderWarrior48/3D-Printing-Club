import { useAuth } from "@/app/AuthProvider";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import { Trash } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native";



type CalendarProps = {
    qrcode?: Boolean,
    canDelete?: Boolean,
}

export default function Calendar(props: CalendarProps) {
    const [loading, setLoading] = useState(true);
    const [attendance, setAttendance] = useState([]);
    const [events, setEvents] = useState([]);
    const { userState } = useAuth()

    const fetchData = async () => {
        const attendance = await axios.post("https://dawson.hamera.com/api/get_attendance.php", { user_id: userState?.user_id });
        const events = await axios.get("https://dawson.hamera.com/api/get_events.php");
        const attendedEvents = attendance.data.map((event: any) => event.event_id)
        setAttendance(attendedEvents)
        setEvents(events.data)
        setLoading(false)
    }
    const removeEvent = async (code: String) => {
        try {
            const result = await axios.post('https://dawson.hamera.com/api/remove_event.php', { verification_code: code });
            fetchData()
            console.log("Deleted successfully", result)
        } catch (error) {
            console.error(error);

        }
    }

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true)
            fetchData();
        }, [])
    );

    const renderEvents = events.map((event) => (
        <HStack className="" key={event.event_id}>
            <Box className="bg-primary-500 p-3 ml-5 rounded items-center">
                <Text className="font-bold">{new Date(event.event_date).getDate().toString().padStart(2, '0')}</Text>
                <Text className="font-bold">{new Date(event.event_date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</Text>
            </Box>

            <Card size="md" variant="elevated" className={attendance.includes(event.event_id) ? ' flex-1 ml-5 mr-5 border border-2 border-primary-500' : 'ml-5 mr-5 flex-1'}>
                <HStack>
                    <VStack className="flex-1">
                        <HStack>
                            <Text>{new Date(`1970-01-01T${event.start_time}Z`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
                            <Text>  -  </Text>
                            <Text>{new Date(`1970-01-01T${event.end_time}Z`).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
                            <View className="flex-1"></View>
                            <Text className="italic">{event.event_type}</Text>
                        </HStack>
                        <Divider />
                    </VStack>
                    {props.canDelete == true && (<Pressable className="pl-3" onPress={() => removeEvent(event.verification_code)}><Icon as={Trash}></Icon></Pressable>)}
                </HStack>
                <Heading size="lg" className="mb-1">
                    {event.event_name}
                </Heading>
                <Text className="text-bold">{event.event_location}</Text>
                <Text>{event.details}</Text>
                {attendance.includes(event.event_id) ? (<Text className="font-bold text-primary-500">ATTENDED</Text>) : ''}
            </Card>

        </HStack>
    ))

    if (loading) {
        return <Text>Loading...</Text>
    }
    else {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchData} />
                }
            >
                <VStack space="md" className="w-full">
                    {renderEvents}
                </VStack>
            </ScrollView>
        )
    }
}
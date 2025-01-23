import { Card } from "@/components/ui/card";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import axios from "axios";
import { Timer } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native";

export default function ManageMeetings() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        var results = await axios.get("https://dawson.hamera.com/api/get_events.php")
        console.log("Loading error", results.data)
        setEvents(results.data)
        setIsLoading(false)
      } catch (e) {
        console.log("Loading error",e)
        setIsLoading(false)
      }
      
    }
    getEvents()
  }, [])
  

  const renderedList = (events || []).map((event) => (
    <Card size="md" variant="elevated" className="m-3">
    <Heading size="md" className="mb-1">{event.event_name}</Heading>
    <Text>Selling fidget toys and new cu.</Text>
    <HStack className="items-center mt-10">
      <Icon as={Timer} />
      <Text>{event.start_time}{event.end_time}</Text>
    </HStack>
  </Card>
  ))

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView>
      <VStack className="m-3 w-full max-w-xl">
        <Heading size="2xl" className="m-5">Events</Heading>
        <VStack className="gap-2">
          {renderedList}
        </VStack>    
      </VStack>
    </ScrollView>
  )
}
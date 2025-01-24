import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Modal, ModalBackdrop, ModalCloseButton, ModalContent, ModalHeader } from "@/components/ui/modal";
import { VStack } from "@/components/ui/vstack";
import axios from "axios";
import { PlusCircle } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, Text } from "react-native";

export default function ManageMeetings() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://dawson.hamera.com/api/get_events.php');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const renderEvents = events.map((event) => (
    <Card size="md" variant="elevated"  className="m-3">
      <Heading size="md" className="mb-1">
        {event.event_name}
      </Heading>
      <Text>{event.verification_code}</Text>
      <Text>{event.start_time}</Text>
      <Text>{event.end_time}</Text>
    </Card>
  ))

  if (loading) {
    return <Text>Loading...</Text>
  }


  return (
   <ScrollView>
    <VStack className="m-3">
      <Heading size="2xl" className="m-5">Today</Heading>
      <VStack className="gap-2">
      <Pressable className="m-3" onPress={() => setShowEditModal(true)}>
        <HStack className="gap-2 items-center">
        <Pressable><Icon size="2xl" as={PlusCircle}></Icon></Pressable>
        <Heading size="lg" className="mb-1">
          Create event
        </Heading>
        </HStack>
      </Pressable>
      <Modal
        isOpen={showEditModal}
        onClose={() => {setShowEditModal(false)}}
        size="md">
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
            <Heading>
              Add New Event
            </Heading>
          <ModalCloseButton>
            <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
          </ModalCloseButton>
          </ModalHeader>
          </ModalContent>

      </Modal>
      
      {renderEvents}
      </VStack>
          
    </VStack>
    </ScrollView>
  )
}
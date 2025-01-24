import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormControl, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorIcon, FormControlErrorText } from "@/components/ui/form-control";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import axios from "axios";
import { AlertCircleIcon, PlusCircle, Trash, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, ScrollView, Text, View } from "react-native";
import uuid from 'react-native-uuid';

export default function ManageMeetings() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const [eventName, setEventName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [startTime, setStartTime] = useState("00/00/00");
  const [endTime, setEndTime] = useState("00/00/00");
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://dawson.hamera.com/api/get_events.php');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const generateCode = () => {
    setVerificationCode(uuid.v4().substring(0, 8))
  }

  const addEvent = async () => {
    try {
      const result = await axios.post('https://dawson.hamera.com/api/add_event.php', { event_name: eventName, verification_code: verificationCode, start_time: startTime, end_time: endTime });
      if (result.data.error) {
        console.log(result.data.error)
        setIsInvalid(true)
        setErrorMessage(result.data.error)
      } else {
        setIsInvalid(false)
        fetchEvents()
        setShowEditModal(false)
      }
    } catch (error) {
      console.error(error);

    }
  }

  const removeEvent = async (code: String) => {
    try {
      const result = await axios.post('https://dawson.hamera.com/api/remove_event.php', {verification_code: code});
      fetchEvents()
      console.log("Deleted successfully", result)
    } catch (error) {
      console.error(error);

    }
  }

  const renderEvents = events.map((event) => (
    <Card size="md" variant="elevated" className="m-3">
      <HStack>
        <VStack className="flex-1">
          <Heading size="md" className="mb-1">
            {event.event_name}
          </Heading>
          <Text>{event.verification_code}</Text>
          <Text>{event.start_time}</Text>
          <Text>{event.end_time}</Text>
        </VStack>
        <Pressable onPress={() => removeEvent(event.verification_code)}><Icon as={Trash}></Icon></Pressable></HStack>
    </Card>
  ))

  if (loading) {
    return <Text>Loading...</Text>
  }

  const editEvent = (
    <Modal animationType="fade" transparent={true} visible={showEditModal}>
      <View className="justify-center flex-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Card size="md" variant="elevated" className="m-3">\
          <HStack className="items-center mb-5">
            <Heading size="lg" className="flex-1">Create Event</Heading>
            <Pressable onPress={() => setShowEditModal(false)}><Icon as={X}></Icon></Pressable>
          </HStack>
          <FormControl
            isInvalid={isInvalid}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Name</FormControlLabelText>
            </FormControlLabel>
            <Input size="md">
              <InputField
                type="text"
                placeholder="Name"
                value={eventName}
                onChangeText={(text) => setEventName(text)}
              />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Verification code</FormControlLabelText>
            </FormControlLabel>
            <HStack space="lg">
              <Input size="md" className="mb-3 flex-1 ">
                <InputField
                  type="text"
                  placeholder="Code"
                  value={verificationCode}
                  onChangeText={(text) => setVerificationCode(text)}
                />
              </Input>
              <Button><ButtonText onPress={() => generateCode()}>Generate</ButtonText></Button>
            </HStack>
            <FormControlLabel>
              <FormControlLabelText>Duration</FormControlLabelText>
            </FormControlLabel>
            <Input size="md" className="mb-3">
              <InputField
                type="text"
                placeholder="Start date"
                value={startDate}
                onChangeText={(text) => setStartDate(text)}
              />
            </Input>
            <Input size="md">
              <InputField
                type="text"
                placeholder="End date"
                value={endDate}
                onChangeText={(text) => setEndDate(text)}
              />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                {errorMessage}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <Button className="mt-3" onPress={() => addEvent()}><ButtonText>Save</ButtonText></Button>
        </Card>
      </View>
    </Modal>
  );



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
          {editEvent}
          {renderEvents}
        </VStack>

      </VStack>
    </ScrollView>
  )
}
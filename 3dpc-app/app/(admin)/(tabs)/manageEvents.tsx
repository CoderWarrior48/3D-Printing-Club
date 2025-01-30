import { useAuth } from "@/app/AuthProvider";
import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormControl, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorIcon, FormControlErrorText } from "@/components/ui/form-control";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from "@/components/ui/select";
import { VStack } from "@/components/ui/vstack";
import axios from "axios";
import { AlertCircleIcon, Minus, PlusCircle, Trash, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, ScrollView, Text, View } from "react-native";
import uuid from 'react-native-uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import QRCodeStyled from 'react-native-qrcode-styled';

import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";


export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [scheduledBy, setScheduledby] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userState } = useAuth();


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    console.log("get_events")
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
    console.log("Adding event...")

    try {
      const result = await axios.post('https://dawson.hamera.com/api/add_event.php', { event_name: eventName, event_type: eventType, event_details: eventDetails, event_location: eventLocation, scheduled_by: `${userState?.firstName} ${userState?.lastName}`, verification_code: verificationCode, event_date: eventDate, start_time: startTime, end_time: endTime });
      console.log(result.data)
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
      console.error("Error", error);

    }
  }

  const removeEvent = async (code: String) => {
    try {
      const result = await axios.post('https://dawson.hamera.com/api/remove_event.php', { verification_code: code });
      fetchEvents()
      console.log("Deleted successfully", result)
    } catch (error) {
      console.error(error);

    }
  }

  const renderEvents = events.map((event) => {
    console.log("s", event.start_time)
    return (
      <HStack className="">
        <Box className="bg-primary-500 p-3 ml-5 rounded items-center">
          <Text className="font-bold">{new Date(event.event_date).getDate().toString().padStart(2, '0')}</Text>
          <Text className="font-bold">{new Date(event.event_date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</Text>
        </Box>

        <Card size="md" variant="elevated" className="ml-5 mr-5 flex-1">
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
            <Pressable className="pl-3" onPress={() => removeEvent(event.verification_code)}><Icon as={Trash}></Icon></Pressable>
          </HStack>
          <HStack className="">

            <VStack className="flex-1">

              <Heading size="lg" className="mb-1">
                {event.event_name}
              </Heading>
              <Text className="text-bold">{event.event_location}</Text>
              <Text>{event.details}</Text>


            </VStack>
            <VStack className="items-center p-5">
              <QRCodeStyled
                data={event.verification_code}
                pieceSize={3}
                pieceLiquidRadius={2}
              />
              <Text style={{ fontStyle: 'italic' }}>{event.verification_code}</Text>
            </VStack>
          </HStack>
        </Card>

      </HStack>
    )
  })

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


            <ModalDropdown
              defaultValue="Type"
              options={['Workshop', 'Meeting', 'Fundraiser', 'Other']}
              onSelect={(index, value) => setEventType(value)}
              style={{ backgroundColor: '#2ECC87', padding: 10, borderRadius: 5, marginTop: 20 }}
              dropdownStyle={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 10 }}
              textStyle={{ fontSize: 16, color: '#333333' }}
              dropdownTextStyle={{ fontSize: 16, color: '#333333' }}
              dropdownTextHighlightStyle={{ color: '#2ECC87' }}
            />

            <FormControlLabel>
              <FormControlLabelText>Details</FormControlLabelText>
            </FormControlLabel>
            <Input size="md">
              <InputField
                type="text"
                placeholder="Details"
                value={eventDetails}
                onChangeText={(text) => setEventDetails(text)}
              />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Location</FormControlLabelText>
            </FormControlLabel>
            <Input size="md">
              <InputField
                type="text"
                placeholder="Location"
                value={eventLocation}
                onChangeText={(text) => setEventLocation(text)}
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
              <FormControlLabelText>Date</FormControlLabelText>
            </FormControlLabel>
            <Input size="md">
              <InputField
                type="text"
                placeholder="Date"
                value={eventDate}
                onChangeText={(text) => setEventDate(text)}
              />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Duration</FormControlLabelText>
            </FormControlLabel>
            <HStack className="items-center">
              <Input size="md" className="w-50 flex-1">
                <InputField
                  type="text"
                  placeholder="Start"
                  value={startTime}
                  onChangeText={(text) => setStartTime(text)}
                />
              </Input>
              <Icon as={Minus}></Icon>
              <Input size="md" className="flex-1">
                <InputField
                  type="text"
                  placeholder="End"
                  value={endTime}
                  onChangeText={(text) => setEndTime(text)}
                />
              </Input>
            </HStack>
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
              <Pressable><Icon size="xl" as={PlusCircle}></Icon></Pressable>
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
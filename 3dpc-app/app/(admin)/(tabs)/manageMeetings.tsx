import { Card } from "@/components/ui/card";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { Text } from "react-native";
import DatePicker from 'react-native-datepicker'

export default function ManageMeetings() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  return (
   
    <VStack className="m-3 w-full max-w-xl">
      <Heading size="2xl" className="m-5">Today</Heading>
      <VStack className="gap-2">

      <Card size="md" variant="elevated"  className="m-3">
        <Heading size="md" className="mb-1">
          Quick Start
        </Heading>
        <DatePicker
          style={{ width: 200 }}
          date={startDate}
          mode="datetime"
          placeholder="Select date"
          format="YYYY-MM-DD HH:mm:ss"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => setStartDate(date)}
        />
         <DatePicker
          style={{ width: 200 }}
          date={endDate}
          mode="datetime"
          placeholder="Select date"
          format="YYYY-MM-DD HH:mm:ss"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => setEndDate(date)}
        />
        <Text>Start building your next project in minutes</Text>
      </Card>
      </VStack>
          
    </VStack>
  )
}
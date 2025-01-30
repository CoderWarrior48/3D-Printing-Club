import { useAuth } from "@/app/AuthProvider";
import Calendar from "@/components/screens/calendar/calendar";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import axios from "axios";
import { useFocusEffect } from "expo-router";

import React, { useState } from "react";
import { View, Text, RefreshControl } from "react-native";
import { ScrollView } from "react-native";


export default function Calender() {
  return (
   
        // <Center className="m-10">
        //   <Heading size="2xl">Calendar</Heading>
        // </Center>
        <Calendar />

  )
}
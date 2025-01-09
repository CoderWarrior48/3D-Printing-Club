import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { View, Text } from "react-native";

export default function Schedule() {
    return (
   
          <VStack space="md" className="w-full rounded-md border border-background-200 p-4" >
            <Box>
                <HStack space="md">
                    <Text>Fri 8/14</Text>
                    <Text>8:15 am</Text>
                    <Text>Ender-3</Text>
                    <Text>Fidget star</Text>
                </HStack>
                <Button>Schedule</Button>
            </Box>
          </VStack>
    )
}
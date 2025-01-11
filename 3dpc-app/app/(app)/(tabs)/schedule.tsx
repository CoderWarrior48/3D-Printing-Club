import { Avatar, AvatarFallbackText, AvatarImage, AvatarBadge } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { View, Text } from "react-native";

const items = [
  {
    key: 1,
    name: "3D Printing",
    time: 30,
    schedule: "12:11 - 12:44",
    tags: ["Ender-3", "Fidget Star"],    
    assigned: "Jane Doe"
  },
  {
    key: 2,
    name: "Meeting",
    time: 40,
    schedule: "12:11 - 12:50",
    tags: ["Rockets"],
    assigned: "Bob Hendricks"
  },
  {
    key: 3,
    name: "Meeting",
    time: 40,
    schedule: "12:11 - 12:50",
    tags: ["Marble Run"],
    assigned: null
  },
  
]

export default function Schedule() {
    return (
        <VStack space="md" className="w-full">
          {items.map((item) => {

            return (
            
            <VStack space="md" className="w-full rounded-md border border-background-200 p-4" >
              <Box className="border-2 rounded-md bg-background-200 p-4">
                <HStack>
                  <VStack className="w-2/3">
                    <Text>{item.time} MIN</Text>
                      <Heading size="xl">{item.name}</Heading>
                    <Text>12:11 - 12:44</Text>
                    <HStack>
                      {item.tags.map((tag) => {
                        return (
                        <Box className="p-2 border-2 rounded-md bg-primary-100 m-3 ml-0">
                          <Text className="text-white">{tag}</Text>
                        </Box>
                        )
                      })}
                    </HStack>
                  </VStack>
                  <VStack className="">
                    <Avatar size="xl">
                      <AvatarFallbackText>{item.assigned}</AvatarFallbackText>
                    </Avatar>
                  </VStack>
                </HStack>
                <Fab
    size="md"
    placement="bottom right"
    isHovered={false}
    isDisabled={false}
    isPressed={false}
  >
    <FabIcon as={AddIcon} />
    <FabLabel>Quick start</FabLabel>
  </Fab>
                  <Button disabled={true}><ButtonText>Scheduled by Jane Doe</ButtonText></Button>
              </Box>
            </VStack>
          )
          })}
        </VStack>
    )
}
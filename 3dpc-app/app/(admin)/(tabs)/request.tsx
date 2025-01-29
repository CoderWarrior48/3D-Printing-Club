import { useEffect } from "react";
import { Text, View } from "react-native";
import { API_URL, useAuth } from "../../AuthProvider";
import axios from "axios";
import { Button, ButtonText } from "@/components/ui/button";

export default function Home() {
    const { onLogout } = useAuth()


    return (
        <View>
            <Text>Fix</Text>
            <Button className="w-fit mt-4" size="sm" onPress={onLogout}>
              <ButtonText>Logout</ButtonText>
            </Button>
        </View>
    )
}
import { useAuth } from "@/app/AuthProvider";
import { Text, View } from "react-native";
export default function AdminScreen() {
    const {userState} = useAuth()

    return (
        <View>
        <Text>You a admin</Text>
        </View>
    )
}
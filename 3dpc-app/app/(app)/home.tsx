import { useEffect } from "react";
import { Text, View } from "react-native";
import { API_URL } from "../AuthProvider";
import axios from "axios";

export default function Home() {

    useEffect(() => {
        const testCall = async () => {
            const result = await axios.get(`${API_URL}/users`)
            console.log('Where in! ', result.data)
        }
        testCall()
    }, [])

    return (
        <View>
            <Text>Home u sneaky</Text>
        </View>
    )
}
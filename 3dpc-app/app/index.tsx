import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const { authState } = useAuth()
    useEffect(() => {
        if (authState?.authenticated) {
            router.push("/home")
        }
    }, [])

    const handleSignIn = () => {
      // This will navigate to the /sign-in page
      router.push('/sign-in');
    };
    return (
        <View>
            <Button onPress={handleSignIn}>
                <ButtonText>
                    Sign in
                </ButtonText>
            </Button>
        </View>
    )
}
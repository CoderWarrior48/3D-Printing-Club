import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import {
    GluestackIcon,
    GluestackIconDark,
  } from "./assets/icons/gluestack-icon";
const printerIcon = require("@/assets/images/3dpc.png");

export default function Home() {
    const router = useRouter();
    const { authState } = useAuth()
    useEffect(() => {
        if (authState?.authenticated) {
            router.push("/home")
        }
    }, [authState?.authenticated])


    const navigateToSignIn = () => {
        router.push('/sign-in')
    }

    return (
        
        <VStack
      className="w-full max-w-[440px] items-center h-full justify-center"
      space="lg"
    >
        <Icon as={EyeIcon} className="w-[219px] h-10" />
      <VStack className="w-full" space="lg">
        <Button
          className="w-full"
          onPress={() => {
            router.push("/sign-in");
          }}
        >
          <ButtonText className="font-medium">Log in</ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.push("/sign-in");
          }}
        >
          <ButtonText className="font-medium">Sign Up</ButtonText>
        </Button>
      </VStack>
    </VStack>
    )
}
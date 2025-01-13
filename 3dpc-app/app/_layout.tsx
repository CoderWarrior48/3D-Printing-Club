
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider } from "./AuthProvider";
import { Slot, usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useColorScheme, View } from "react-native";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { MessageCircleWarningIcon } from "lucide-react-native";

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const [colorMode, setColorMode] = useState<"light" | "dark">(systemColorScheme || "light");
  const [isfeedbackOpen, setIsFeedbackOpen] = useState(false);
  console.log(colorMode)
  const path = usePathname()
  console.log(path)


  return(
    <GluestackUIProvider mode={"light"}>
      <AuthProvider>
        {/* {Dark mode light mode implement below breaks screen layout for some reason.} */}
          {/* <Button
            onPress={() => {
              setColorMode(colorMode === "light" ? "dark" : "light");
            }}
          >
            <ButtonText>Toggle color mode</ButtonText>
          </Button> */}
        {/* {colorMode === 'dark' ? (
        <View className="bg-background-dark">
          <Slot />
        </View>
        ) : (
        <View className="bg-background-light">
          <Slot />
        </View>
        )} */}
          <Slot/>
          {/* <Fab
            size="md"
            placement="bottom right"
            isHovered={false}
            isDisabled={false}
            isPressed={false}
          >
            <FabIcon as={MessageCircleWarningIcon} />
          </Fab> */}
      </AuthProvider>
    </GluestackUIProvider>
  )
}

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider } from "./AuthProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
  return(
    <GluestackUIProvider mode="light">
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GluestackUIProvider>
  )
}
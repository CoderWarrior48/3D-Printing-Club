import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // For handling focus events
import { Button, ButtonText } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@/app/AuthProvider";
import { Icon } from "@/components/ui/icon";
import { AlertCircle, CheckCircle } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";

export default function CodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false); // State to track if a QR code has been scanned
  const [scannedData, setScannedData] = useState(""); // Store scanned QR code data
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { userState } = useAuth()

  const verifyCode = async ({ type, data }) => {
    setScanned(true); // Mark the scan as complete
    const response = await axios.post("https://dawson.hamera.com/api/attendance.php", { user_id: userState?.user_id, verification_code: data })
    console.log(response.data)
    console.log(data)
    if (!response.data.error) {
      setIsError(false)
      setMessage(response.data.event_name)
    }
    else {
      setIsError(true)
      setMessage(response.data.error)
    }

  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true); // Mark the scan as complete
    setScannedData(data); // Store the QR code data
    console.log(scannedData)
    console.log(data)
    // verifyCode();
  };

  useFocusEffect(
    useCallback(() => {
      setScanned(false); // Reset scanned state when coming back to the screen
      setScannedData(""); // Optionally reset the scanned data
    }, [])
  );

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera permissions required to scan</Text>
        <Button className="w-fit mt-4" size="sm" onPress={requestPermission}>
          <ButtonText>Create Account</ButtonText>
        </Button>
      </View>
    );
  }
  if (!scanned) {
    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={"back"}
          onBarcodeScanned={scanned ? undefined : verifyCode} // Disable scanning once a QR code is scanned
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>Code is</Text>
            {scanned && (
              <Text style={styles.text}>Scanned data: {scannedData}</Text>
            )}
          </View>
        </CameraView>
      </View>
    );
  }
  if (isError) {
    return (

      <View style={styles.container}>
        <View>
          <Ionicons
            name="alert-circle"
            color="#25292e"
            size={70}
            style={styles.icon}
          />
          <Text style={styles.header}>Error</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
        <Button onPress={() => setScanned(false)}><ButtonText>Try Again</ButtonText></Button>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <Ionicons
          name="checkmark-circle"
          color="#25292e"
          size={70}
          style={styles.icon}
        />
        <Text style={styles.header}>Registered</Text>
      </View>
      <Text style={styles.message}>Welcome to {message}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  icon: {
    textAlign: "center",
  },
});

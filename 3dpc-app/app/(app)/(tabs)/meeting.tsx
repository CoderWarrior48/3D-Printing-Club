import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // For handling focus events
import { Button, ButtonText } from "@/components/ui/button";

export default function CodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false); // State to track if a QR code has been scanned
  const [scannedData, setScannedData] = useState(""); // Store scanned QR code data

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true); // Mark the scan as complete
    setScannedData(data); // Store the QR code data
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
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} // Disable scanning once a QR code is scanned
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
  return (
    <View style={styles.container}>
      <Ionicons
        name="checkmark-circle"
        color="#25292e"
        size={70}
        style={styles.icon}
      />
      <Text style={styles.header}>Registered</Text>
      <Text style={styles.message}>Welcome to the Onshape Workshop!</Text>
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

import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View, Button, Alert } from "react-native";
import { createReminder } from "../utils/api";

export default function HomeScreen() {
  async function testBackend() {
    try {
      const result = await createReminder({
        title: "Test from phone",
        description: "This came from the Expo app",
        due_date: "2025-11-24 22:00",
        priority: 3,
      });

      console.log("Backend response:", result);
      Alert.alert("Backend says:", JSON.stringify(result, null, 2));
    } catch (e) {
      Alert.alert("Error", e.message ?? "Request failed");
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
        style={styles.overlay}
      >
        <Text style={styles.title}>Welcome to WEthan!</Text>
      </LinearGradient>

      <Image
        source={require("../../assets/images/Ethan.jpg")}
        style={styles.image}
      />

      {/* Test button */}
      <View style={{ marginTop: 30 }}>
        <Button title="Test Backend" onPress={testBackend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});

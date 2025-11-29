import { StyleSheet, Text, View } from "react-native";

export default function MotivationalView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stay Hard 💪</Text>
      <Text style={styles.subtitle}>
        “Discipline is doing what you hate to do, but do it like you love it.” — David Goggins
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff6f00",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    fontStyle: "italic",
  },
});

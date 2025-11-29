import { StyleSheet, Text, View } from "react-native";

export default function SeriousView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕒 Focus Mode</Text>
      <Text style={styles.subtitle}>“Wake up, stay focused, and make it happen.”</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222",
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

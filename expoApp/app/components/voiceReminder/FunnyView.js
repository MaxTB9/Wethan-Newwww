import { StyleSheet, Text, View } from "react-native";

export default function FunnyView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤣 Get Ready!</Text>
      <Text style={styles.emojiText}> 😜 🤪</Text>
      <Text style={styles.emojiText}>🥳 Let's Get Moving!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5a623",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  emojiText: {
    fontSize: 24,
    marginTop: 10,
    color: "#fff",
    textAlign: "center",
  },
});

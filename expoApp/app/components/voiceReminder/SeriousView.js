import { StyleSheet, Text, View } from "react-native";

export default function SeriousView() {
  return (
    <View style={styles.bg}>
      <Text style={styles.title}>FOCUS MODE</Text>

      <Text style={styles.subtitle}>
        “Discipline is choosing what you want most over what you want now.”
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 30,
    borderRadius: 16,
    backgroundColor: "#111",               // solid dark
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)", // subtle outline
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 15,
    textAlign: "left",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 17,
    color: "#ccc",
    fontStyle: "italic",
    lineHeight: 26,
  },
});

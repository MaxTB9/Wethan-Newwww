import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function MotivationalView() {
  return (
    <ImageBackground
      source={require("../../../assets/images/gym-bg.jpg")}
      style={styles.bg}
      imageStyle={{ opacity: 0.45 }}
      blurRadius={1.5}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>STAY HARD </Text>
        <Text style={styles.subtitle}>
          “The body achieves what the mind believes”
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  overlay: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    fontStyle: "italic",
    lineHeight: 26,
  },
});

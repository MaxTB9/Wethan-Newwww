import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function FunnyView() {
  return (
    <ImageBackground
      source={require("../../../assets/images/funny-dog.jpg")} // <-- your image
      style={styles.bg}
      imageStyle={{ opacity: 0.5 }}
      blurRadius={0.7}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>READY FOR A FUN TIME 🤣</Text>

        <Text style={styles.subtitle}>
          “Life is hard. Be harder.”
        </Text>

        <Text style={styles.emojiBlock}></Text>
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
    paddingVertical: 35,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 16,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#ffffffff",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffffff",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 15,
  },
  emojiBlock: {
    fontSize: 30,
    textAlign: "center",
  },
});

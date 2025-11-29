import { StyleSheet, View } from "react-native";
import AddAlarm from "../components/voiceReminder/AddAlarm";

export default function VoiceReminder() {
  return (
    <View style={styles.container}>
      <AddAlarm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f1f1f1",
  },
});

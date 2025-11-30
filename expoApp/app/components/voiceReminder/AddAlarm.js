import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { Audio } from "expo-av";
import { createAlarm } from "../../utils/api";
import FunnyView from "./FunnyView";
import MotivationalView from "./MotivationalView";
import SeriousView from "./SeriousView";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function AddAlarm() {
  const [time, setTime] = useState("");
  const [label, setLabel] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState(2);
  const [mood, setMood] = useState("motivational");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [soundRef, setSoundRef] = useState(null);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const playTestSound = async () => {
    try {
      // Stop previous sound if playing
      if (soundRef) {
        await soundRef.stopAsync();
        await soundRef.unloadAsync();
      }

      // Set audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Load and play sound
      const soundMap = {
        funny: require("../../../assets/images/sounds/Funny.mp4"),
        motivational: require("../../../assets/images/sounds/Motivational.mp4"),
        serious: require("../../../assets/images/sounds/Serious.mp4"),
      };

      console.log("Playing sound for mood:", mood);
      const { sound } = await Audio.Sound.createAsync(soundMap[mood]);
      setSoundRef(sound);
      await sound.playAsync();
      Alert.alert("✅ Playing", `Now playing ${mood} sound...`);
    } catch (error) {
      console.error("Error playing test sound:", error);
      Alert.alert("❌ Error", error.message || "Could not play sound");
    }
  };

  const handleSaveAlarm = async () => {
    if (!time || !label || !date) {
      Alert.alert("Missing fields", "Please fill all fields before saving.");
      return;
    }

    try {
      const [hh, mm] = time.split(":");
      if (!hh || !mm) {
        Alert.alert("Invalid time", "Please enter time in HH:MM format.");
        return;
      }

      const fullDate = new Date(date);
      fullDate.setHours(parseInt(hh), parseInt(mm), 0, 0);

      if (fullDate < new Date()) {
        Alert.alert("Invalid time", "This alarm is in the past!");
        return;
      }

      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Notification permission not granted");
        return;
      }

      const result = await createAlarm({
        time: fullDate.toISOString(),
        repeat: "none",
        label: label,
        priority: priority,
        mood: mood,
      });

      const trigger = new Date(fullDate);
      const now = new Date();
      const seconds = Math.round((trigger - now) / 1000);

      if (seconds <= 0) {
        Alert.alert("Invalid time", "Please set a future time");
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `🔔 ${label}`,
          body: `Time for: ${label} (${mood.toUpperCase()})`,
          sound: "default",
          vibrate: [200, 100, 200],
          data: { mood },
        },
        trigger: { seconds },
      });

      Alert.alert("✅ Alarm Set!", `Alarm set for ${fullDate.toLocaleTimeString()}`);
      
      setTime("");
      setLabel("");
      setDate(null);
      setMood("motivational");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", error.message || "Failed to save alarm");
    }
  };

  const formattedDate = date
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date)
    : "";

  const getMoodBackground = () => {
    switch (mood) {
      case "funny":
        return <FunnyView />;
      case "motivational":
        return <MotivationalView />;
      case "serious":
        return <SeriousView />;
      default:
        return <MotivationalView />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {getMoodBackground()}
      <View style={styles.contentOverlay}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Add Alarm</Text>

            <Text style={styles.inputLabel}>Pick Time</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter time (07:30)"
              value={time}
              onChangeText={setTime}
            />

            <Text style={styles.inputLabel}>Label</Text>
            <TextInput
              style={styles.inputField}
              placeholder="e.g. Gym, Class, Nap"
              value={label}
              onChangeText={setLabel}
            />

            <Text style={styles.inputLabel}>Pick Date</Text>
            <Button title="Select Date" onPress={() => setShowDatePicker(true)} />

            {showDatePicker && (
              <DateTimePicker value={date || new Date()} mode="date" display="default" onChange={onChangeDate} />
            )}

            {formattedDate ? <Text style={styles.dateText}>📅 {formattedDate}</Text> : null}

            <Text style={styles.inputLabel}>Mood</Text>
            <View style={styles.moodButtons}>
              {["funny", "motivational", "serious"].map((moodOption) => (
                <TouchableOpacity
                  key={moodOption}
                  style={[styles.moodButton, mood === moodOption && styles.moodButtonActive]}
                  onPress={() => setMood(moodOption)}
                >
                  <Text style={[styles.moodButtonText, mood === moodOption && styles.moodButtonTextActive]}>
                    {moodOption.charAt(0).toUpperCase() + moodOption.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Button title="🔊 Test Sound" onPress={playTestSound} />

            <Text style={styles.inputLabel}>Priority</Text>
            <View style={styles.priorityButtons}>
              {[1, 2, 3].map((value) => {
                const labelText = value === 1 ? "Low" : value === 2 ? "Medium" : "High";
                const isSelected = priority === value;
                return (
                  <TouchableOpacity
                    key={value}
                    style={[styles.priorityButton, isSelected && styles.priorityButtonSelected]}
                    onPress={() => setPriority(value)}
                  >
                    <Text style={[styles.priorityText, isSelected && styles.priorityTextSelected]}>
                      {labelText}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Button title="💾 Save Alarm" onPress={handleSaveAlarm} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 150,
  },
  header: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 25,
    textAlign: "center",
    color: "white",
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "white",
  },
  inputField: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
    color: "#f0f0f0",
    fontStyle: "italic",
  },
  moodButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
    gap: 8,
  },
  moodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
  },
  moodButtonActive: {
    backgroundColor: "#ffb74d",
    borderColor: "#ffb74d",
  },
  moodButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  moodButtonTextActive: {
    color: "#000",
    fontWeight: "800",
  },
  priorityButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  priorityButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
  },
  priorityButtonSelected: {
    backgroundColor: "#ffd54f",
    borderColor: "#ffeb3b",
  },
  priorityText: {
    color: "#f5f5f5",
    fontWeight: "500",
  },
  priorityTextSelected: {
    color: "#000",
    fontWeight: "800",
  },
});
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Alert } from "react-native";

import FunnyView from "./FunnyView";
import MotivationalView from "./MotivationalView";
import SeriousView from "./SeriousView";

// correct path for your project
import { createAlarm } from "../../utils/api";

export default function AddAlarm() {
  const [voice, setVoice] = useState("Serious");
  const [time, setTime] = useState("");
  const [label, setLabel] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState(2); // 1=low, 2=medium, 3=high
  const [showDatePicker, setShowDatePicker] = useState(false);

  const renderVoicePreview = () => {
    switch (voice) {
      case "Motivational":
        return <MotivationalView />;
      case "Funny":
        return <FunnyView />;
      default:
        return <SeriousView />;
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleSaveAlarm = async () => {
    if (!time || !label || !date) {
      Alert.alert("Missing fields", "Please fill all fields before saving.");
      return;
    }

    try {
      const [hh, mm] = time.split(":");
      const fullDate = new Date(date);
      fullDate.setHours(parseInt(hh), parseInt(mm), 0, 0);

      const result = await createAlarm({
        time: fullDate.toISOString(),
        voice_file_path: `${voice}.m4a`,
        repeat: "none",
        label: label,
        priority: priority, // 🔥 send priority
      });

      Alert.alert("Alarm saved!", JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save alarm.");
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Alarm</Text>

      {/* VOICE SELECT */}
      <View style={styles.buttonRow}>
        {["Motivational", "Funny", "Serious"].map((option) => (
          <Button key={option} title={option} onPress={() => setVoice(option)} />
        ))}
      </View>

      {/* TIME INPUT */}
      <Text style={styles.inputLabel}>Pick Time</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Enter time (07:30)"
        value={time}
        onChangeText={setTime}
      />

      {/* LABEL INPUT */}
      <Text style={styles.inputLabel}>Label</Text>
      <TextInput
        style={styles.inputField}
        placeholder="e.g. Gym, Class, Nap"
        value={label}
        onChangeText={setLabel}
      />

      {/* DATE PICKER */}
      <Text style={styles.inputLabel}>Pick Date</Text>
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {formattedDate ? <Text style={styles.dateText}>📅 {formattedDate}</Text> : null}

      {/* PRIORITY SELECTOR */}
      <Text style={styles.inputLabel}>Priority</Text>
      <View style={styles.buttonRow}>
        <Button title="Low" onPress={() => setPriority(1)} />
        <Button title="Medium" onPress={() => setPriority(2)} />
        <Button title="High" onPress={() => setPriority(3)} />
      </View>

      {/* PREVIEW */}
      {renderVoicePreview()}

      {/* SAVE BUTTON */}
      <Button title="Save Alarm" onPress={handleSaveAlarm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  inputField: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
});

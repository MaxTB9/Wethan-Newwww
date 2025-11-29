import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getAlarms } from "../utils/api";

// Extract mode from "Serious.m4a"
function getModeFromPath(path) {
  if (!path) return "Unknown";
  return path.replace(".m4a", "").replace(".mp3", "");
}

export default function SavedAlarms() {
  const [alarms, setAlarms] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  async function loadAlarms() {
    const data = await getAlarms();
    const arr = data.alarms || [];
    setAlarms(arr);
    setFiltered(arr);
  }

  useFocusEffect(
    React.useCallback(() => {
      loadAlarms();
    }, [])
  );

  // --------------------------
  // SORT / FILTER HANDLER
  // --------------------------
  function applySortOrFilter(option) {
    let list = [...alarms];

    // Priority sorting
    if (option === "priority-asc") {
      list.sort((a, b) => (a.priority ?? 1) - (b.priority ?? 1));
    }
    if (option === "priority-desc") {
      list.sort((a, b) => (b.priority ?? 1) - (a.priority ?? 1));
    }

    // Date sorting
    if (option === "date-asc") {
      list.sort((a, b) => new Date(a.time) - new Date(b.time));
    }
    if (option === "date-desc") {
      list.sort((a, b) => new Date(b.time) - new Date(a.time));
    }

    // FILTERS
    if (option === "mode-all") {
      list = alarms;
    }
    if (option === "mode-serious") {
      list = alarms.filter((i) => getModeFromPath(i.voice_file_path) === "Serious");
    }
    if (option === "mode-funny") {
      list = alarms.filter((i) => getModeFromPath(i.voice_file_path) === "Funny");
    }
    if (option === "mode-motivational") {
      list = alarms.filter(
        (i) => getModeFromPath(i.voice_file_path) === "Motivational"
      );
    }

    setFiltered(list);
    setDropdownOpen(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Alarms</Text>

      {/* DROPDOWN BUTTON */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <Text style={styles.dropdownText}>Filter</Text>
        <Text style={styles.arrow}>{dropdownOpen ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {/* DROPDOWN CONTENT */}
      {dropdownOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={() => applySortOrFilter("priority-asc")}>
            <Text style={styles.option}>Priority: Low → High</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => applySortOrFilter("priority-desc")}>
            <Text style={styles.option}>Priority: High → Low</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => applySortOrFilter("date-asc")}>
            <Text style={styles.option}>Date: Oldest → Newest</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => applySortOrFilter("date-desc")}>
            <Text style={styles.option}>Date: Newest → Oldest</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => applySortOrFilter("mode-all")}>
            <Text style={styles.option}>Mode: All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => applySortOrFilter("mode-serious")}>
            <Text style={styles.option}>Mode: Serious</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => applySortOrFilter("mode-funny")}>
            <Text style={styles.option}>Mode: Funny</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => applySortOrFilter("mode-motivational")}>
            <Text style={styles.option}>Mode: Motivational</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const mode = getModeFromPath(item.voice_file_path);

          return (
            <View style={styles.card}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.text}>Time: {item.time}</Text>
              <Text style={styles.text}>Priority: {item.priority ?? "N/A"}</Text>
              <Text style={styles.text}>Mode: {mode}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "500",
  },
  arrow: {
    fontSize: 16,
  },
  dropdownMenu: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  option: {
    padding: 12,
    fontSize: 16,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  card: {
    padding: 15,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
});

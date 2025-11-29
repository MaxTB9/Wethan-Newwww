import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffb703",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: { backgroundColor: "#222" },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="voiceReminder"
        options={{
          title: "Voice Reminder",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alarm-outline" size={size} color={color} />
          ),
        }}
      />

      {/* ⭐ NEW SAVED ALARMS TAB ⭐ */}
      <Tabs.Screen
        name="savedAlarms"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

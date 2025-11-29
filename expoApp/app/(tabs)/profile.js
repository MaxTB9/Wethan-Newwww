import { useState } from "react";
import { Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

export default function ProfileScreen() {
  const [bio, setBio] = useState("");
  const [goals, setGoals] = useState("");  // State for current goals
  const [profileSaved, setProfileSaved] = useState(false);  // State for profile saved message

  const handleBioChange = (text) => {
    setBio(text);
  };

  const handleGoalsChange = (text) => {
    setGoals(text);
  };

  const handleSubmit = () => {
    console.log("Profile saved!");
    setProfileSaved(true);  // Show profile saved message
    Keyboard.dismiss(); // Dismiss the keyboard when done

    // Hide the profile saved message after 3 seconds
    setTimeout(() => {
      setProfileSaved(false);
    }, 3000);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Create your profile!</Text>

        <View style={styles.bioContainer}>
          <Text style={styles.bioTitle}>Your Bio</Text>
          <TextInput
            style={styles.bioInput}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={4}
            value={bio}
            onChangeText={handleBioChange}
            onSubmitEditing={() => {}}
            blurOnSubmit={false}
          />
        </View>

        <View style={styles.goalsContainer}>
          <Text style={styles.goalsTitle}>Current Goals</Text>
          <TextInput
            style={styles.bioInput}
            placeholder="What are your current goals?"
            multiline
            numberOfLines={4}
            value={goals}
            onChangeText={handleGoalsChange}
            onSubmitEditing={() => {}}
            blurOnSubmit={false}
          />
        </View>

        <Button title="Save Profile" onPress={handleSubmit} />

        {/* Show "Profile saved!" message if the profile is saved */}
        {profileSaved && (
          <Text style={styles.savedMessage}>Profile saved!</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  bioContainer: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5, // for Android shadow effect
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  goalsContainer: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  goalsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  bioInput: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: "top", // To align text at the top
  },
  savedMessage: {
    marginTop: 20,
    fontSize: 18,
    color: "#28a745",  // Green color for "Profile saved!" message
    fontWeight: "bold",
  },
});

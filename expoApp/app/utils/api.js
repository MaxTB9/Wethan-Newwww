const BACKEND_URL = "http://192.168.1.42:8002";

export async function createAlarm(alarmData) {
  try {
    const response = await fetch(`${BACKEND_URL}/createAlarm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alarmData),
    });
    if (!response.ok) {
      throw new Error(`Failed to create alarm: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("createAlarm error:", error);
    throw error;
  }
}

export async function getAlarms() {
  try {
    const response = await fetch(`${BACKEND_URL}/allAlarms`);
    if (!response.ok) {
      throw new Error(`Failed to get alarms: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("getAlarms error:", error);
    throw error;
  }
}

export async function getAlarmSound(mood) {
  try {
    const response = await fetch(`${BACKEND_URL}/alarmSound/${encodeURIComponent(mood)}`);
    if (!response.ok) {
      throw new Error(`Failed to get alarm sound: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("getAlarmSound error:", error);
    throw error;
  }
}

export async function clearAllAlarms() {
  try {
    const response = await fetch(`${BACKEND_URL}/clearAllAlarms`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Failed to clear alarms: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("clearAllAlarms error:", error);
    throw error;
  }
}

export async function createReminder(reminderData) {
  try {
    const response = await fetch(`${BACKEND_URL}/createReminder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reminderData),
    });
    if (!response.ok) {
      throw new Error(`Failed to create reminder: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("createReminder error:", error);
    throw error;
  }
}

export async function getReminders() {
  try {
    const response = await fetch(`${BACKEND_URL}/allReminders`);
    if (!response.ok) {
      throw new Error(`Failed to get reminders: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("getReminders error:", error);
    throw error;
  }
}

export default {
  createAlarm,
  getAlarms,
  getAlarmSound,
  clearAllAlarms,
  createReminder,
  getReminders,
};

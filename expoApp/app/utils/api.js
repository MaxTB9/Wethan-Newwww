// ⚠️ REPLACE this with your own ngrok https URL
export const BACKEND_URL = "https://metrically-unpromiscuous-mafalda.ngrok-free.dev";

// ------------------------------
// CREATE REMINDER
// ------------------------------
export async function createReminder(reminder) {
  try {
    const response = await fetch(`${BACKEND_URL}/createReminder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reminder),
    });

    return await response.json();
  } catch (error) {
    console.error("Backend error:", error);
    throw error;
  }
}

// ------------------------------
// CREATE ALARM
// ------------------------------
export async function createAlarm(data) {
  const response = await fetch(`${BACKEND_URL}/createAlarm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
}

// ------------------------------
// GET ALL ALARMS   👈 (NEWLY ADDED)
// ------------------------------
export async function getAlarms() {
  try {
    const response = await fetch(`${BACKEND_URL}/allAlarms`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching alarms:", error);
    throw error;
  }
}

// ------------------------------
// GET ALL REMINDERS (optional)
// ------------------------------
export async function getReminders() {
  try {
    const response = await fetch(`${BACKEND_URL}/allReminders`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching reminders:", error);
    throw error;
  }
}

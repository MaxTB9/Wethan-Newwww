from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from reminder_model import Reminder, Alarm
from sorting import quicksort
from storage import Repository
import asyncio

app = FastAPI()

# -----------------------------------------
# LOAD SAVED DATA FROM JSON AT STARTUP
# -----------------------------------------
repo = Repository("data.json")
alarms, reminders = repo.load(Alarm, Reminder)

# --------------------------
# REMINDERS
# --------------------------

class ReminderRequest(BaseModel):
    title: str
    description: str
    due_date: str
    priority: int

@app.post("/createReminder")
def create_reminder(data: ReminderRequest):
    due_date = datetime.strptime(data.due_date, "%Y-%m-%d %H:%M")
    reminder = Reminder(
        title=data.title,
        description=data.description,
        due_date=due_date,
        priority=data.priority
    )
    reminders.append(reminder)
    repo.save(alarms, reminders)
    return {
        "status": "success",
        "reminder": reminder.show_info()
    }

@app.get("/allReminders")
def get_all():
    return [r.show_info() for r in reminders]

# --------------------------
# ALARMS
# --------------------------

class AlarmRequest(BaseModel):
    time: str
    repeat: str
    label: str
    priority: int = 2
    mood: str = "motivational"

@app.post("/createAlarm")
def create_alarm(data: AlarmRequest):
    alarm = Alarm(
        time=datetime.fromisoformat(data.time),
        repeat=data.repeat,
        label=data.label,
        priority=data.priority,
        mood=data.mood
    )
    alarms.append(alarm)
    repo.save(alarms, reminders)
    return {
        "status": "success",
        "alarm": alarm.to_dict(),
        "sound_file": f"{alarm.mood}.mp3"
    }

@app.get("/allAlarms")
def get_alarms():
    return {"alarms": [a.to_dict() for a in alarms]}

@app.get("/clearAllAlarms")
def clear_all_alarms():
    alarms.clear()
    repo.save(alarms, reminders)
    return {"status": "success", "message": "All alarms deleted"}

@app.get("/alarmSound/{mood}")
def get_alarm_sound(mood: str):
    """Returns the sound file path for a given mood"""
    valid_moods = {"funny", "motivational", "serious"}
    if mood not in valid_moods:
        mood = "motivational"
    return {"sound_file": f"{mood}.mp3"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)  # 0.0.0.0 allows all connections

from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from reminder_model import Reminder
from alarm_model import Alarm
from sorting import quicksort
from storage import Repository   # ← ADD THIS

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

@app.get("/")
def home():
    return {"status": "Wethan backend running!"}

@app.post("/createReminder")
def create_reminder(data: ReminderRequest):
    due_date = datetime.strptime(data.due_date, "%Y-%m-%d %H:%M")

    reminder = Reminder(
        title=data.title,
        description=data.description,
        due_date=due_date,
        priority=data.priority
    )

    # SAVE NEW REMINDER
    reminders.append(reminder)
    repo.save(alarms, reminders)   # ← ADD THIS

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
    time: str               # ISO string
    voice_file_path: str
    repeat: str
    label: str

@app.post("/createAlarm")
def create_alarm(data: AlarmRequest):
    alarm = Alarm(
        time=datetime.fromisoformat(data.time),
        voice_file_path=data.voice_file_path,
        repeat=data.repeat,
        label=data.label
    )

    alarms.append(alarm)
    repo.save(alarms, reminders)  
    return {"status": "success", "alarm": {
    "label": alarm.label,
    "time": alarm.time.isoformat(),
    "voice_file": alarm.voice_file_path,
    "repeat": alarm.repeat,
    "active": alarm.active
}}


@app.get("/allAlarms")
def get_alarms():
    return {"alarms": [a.to_dict() for a in alarms]}





@app.get("/sortedReminders")
def get_sorted():
    sorted_list = quicksort(reminders)
    return [
        {
            "title": r.title,
            "description": r.description,
            "due_date": r.due_date.isoformat(),
            "priority": r.priority,
            "completed": r.completed
        }
        for r in sorted_list
    ]

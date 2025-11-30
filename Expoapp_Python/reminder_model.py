from datetime import datetime

class Reminder:
    def __init__(self, title, description, due_date, priority):
        self.title = title
        self.description = description
        self.due_date = due_date
        self.priority = priority
        self.completed = False
        self.created_at = datetime.now()

    def show_info(self):
        return {
            "title": self.title,
            "description": self.description,
            "due_date": self.due_date.isoformat(),
            "priority": self.priority,
            "completed": self.completed
        }

    def mark_complete(self):
        self.completed = True
        print(f"Reminder '{self.title}' marked as done!")

    def edit_reminder(self, new_title=None, new_description=None, new_due_date=None, new_priority=None):
        if new_title:
            self.title = new_title
        if new_description:
            self.description = new_description
        if new_due_date:
            self.due_date = new_due_date
        if new_priority:
            self.priority = new_priority
        print(f"Reminder '{self.title}' updated!")

    def is_overdue(self):
        return datetime.now() > self.due_date


class Alarm:
    def __init__(self, time, repeat, label, priority=2, mood="motivational"):
        self.time = time
        self.repeat = repeat
        self.label = label
        self.priority = priority
        self.mood = mood
        self.active = True

    def to_dict(self):
        return {
            "time": self.time.isoformat(),
            "repeat": self.repeat,
            "label": self.label,
            "priority": self.priority,
            "mood": self.mood,
            "active": self.active,
        }

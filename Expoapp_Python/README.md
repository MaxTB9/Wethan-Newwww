# ReactNative1
The first front end repo

This project is built with [React Native](https://reactnative.dev) and [Expo](https://expo.dev).

## Getting Started

1. Install dependencies
   ```bash
   npm install




New readme: <-----------

I. Description (fast)
II. technologies used and better description
III. Challenges + future addons
IV. and V. How to run and install project
VI. Credit
VII. Licence


I.
Wethan is an app used to remake alarms into a more fun and interactive system.


II.
The technologies used are:
- React Native (Frontend mobile development)
- Expo (Development framework and deployment)
- Python FastAPI (Backend REST API)
- Expo AV (Audio playback)
- Expo Notifications (Push notifications)
- Expo Router (Navigation)

The application allows the user to create a profile, save goals, then create an alarm that you can: save an alarm for time and date, give it a tittle, choose a mood (for now funny, motivational, serious), listen to the audio to see if you like it, and give it a priority. You can then save the alarm. Then there is a page in which you have your saved alarms, that you can filter using different filters, to find your alarms easier (by mood, priority etc). 


III.
Challenges / future features:

The biggest challenge was adding elements each time, as I had to change a lot of code for each added element. In summary, I should have organized the code creation better. But I did not know exaclty what I knew how to do or not, so it would have also been hard to figure everything out from the beginning.

In the future, I will add a better filtering system, a profile login with email, more moods, the ability to create your own moods, the ability to create your own priorities with their levels and more.


IV. and V.
For the Backend (Python):
1. Navigate to the Expoapp_Python folder: cd Expoapp_Python
2. Create a virtual environment: python -m venv venv
3. Activate the virtual environment:
   - Windows: venv\Scripts\activate
   - macOS/Linux: source venv/bin/activate
4. Install dependencies: pip install -r requirements.txt
5. Run the server: python main.py
6. You should see: "INFO: Uvicorn running on http://0.0.0.0:8002"
7. Test the backend at: http://localhost:8002/docs (interactive API documentation)

Setup Requirements:
- Node.js v16+ and npm installed
- Python 3.8+ installed
- Expo Go app on your phone
- Phone and PC on the same WiFi network
- Audio files (Funny.mp4, Motivational.mp4, Serious.mp4) in expoApp/assets/images/sounds/

Network Configuration:
- Find your PC IP: ipconfig (on Windows)
- Update expoApp/app/utils/api.js with your PC IP
- Example: const BACKEND_URL = "http://192.168.1.42:8002"
- Allow firewall access to port 8002 on Windows

Troubleshooting:
- If port 8002 is already in use, kill the process or change the port in main.py
- If frontend can't connect, verify backend is running and firewall allows the port
- If audio doesn't play, ensure audio files exist in the correct folder
- If notifications don't show, grant notification permissions on your phone
- Clear Expo cache if experiencing issues: npx expo start -c


VI.
Credit : 
Maximiliano Biatturi
Mate Antal
David Hyeon
Bartolome Urda
Ethan Jessup
Theodore David


VII. 
Project is free of licence, you can use it at your own content.



Version 1.2: 11/30/2025


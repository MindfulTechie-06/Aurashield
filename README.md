# 🚨 AuraShield

### AI-Powered Emergency Response Orchestrator for Smart Hospitality

> Transforming emergency response from passive reporting into intelligent, real-time coordination.

---

## 📌 Overview

**AuraShield** is a real-time emergency response platform designed for hospitality environments (hotels, resorts, campuses) that enables:

* ⚡ Instant emergency reporting by guests
* 🧠 AI-driven incident analysis using Google Gemini
* 📡 Real-time alert propagation to staff
* 🖥️ Centralized dashboard for coordinated response
* 📊 Incident tracking and resolution workflow

---

## 🎯 Problem Statement

Traditional emergency systems in hospitality suffer from:

* Delayed reporting (manual calls, front desk dependency)
* Language barriers between guests and staff
* Lack of centralized monitoring
* Inefficient coordination during critical situations

👉 Result: **Slower response times and higher risk**

---

## 💡 Solution

AuraShield introduces an **AI-powered emergency orchestration system** that:

* Converts raw guest input into structured emergency intelligence
* Classifies severity and suggests actions instantly
* Notifies staff in real time
* Enables coordinated and faster decision-making

---

## 🔄 System Workflow

1. 🚨 **Incident Occurs**
2. 📱 **Detected / Reported via Guest App**
3. 🧠 **AI Analysis (Translation + Severity + Action)**
4. 📢 **Alert Triggered**
5. 🖥️ **Real-time Coordination via Dashboard**
6. ✅ **Resolution & Reporting**

---

## 🏗️ Architecture Overview

### 🔹 Client Layer

* Guest App (Flutter / React Native)
* Staff Dashboard (Web)

### 🔹 Backend Services

* Node.js Server (API + Business Logic)
* Firebase Services (Realtime handling)
* Notification System (Push / SMS / Email APIs)

### 🔹 AI / Intelligence Layer

* Gemini API for:

  * Translation
  * Classification
  * Severity detection
  * Action recommendation

### 🔹 Data Layer

* Firebase Firestore (real-time database)
* Cloud Storage (optional for logs/media)

### 🔹 Cloud Infrastructure

* Google Cloud Platform (GCP)

### 🔹 Integrations

* Maps API (location visualization)
* Notification APIs (Push, SMS, Email)
* Future: IoT / CCTV integration

---

## 🧩 Features

### 📱 Guest SOS Interface

* One-tap emergency reporting
* Category selection (Fire, Medical, Security)
* Multilingual input support
* Voice input (planned / optional)
* Instant confirmation feedback

---

### 🖥️ Staff Dashboard

* Real-time alert feed
* Severity-based prioritization
* Visual map with alert indicators
* Action panel (Dispatch / Evacuate / Resolve)

---

### 🧠 AI Engine

* Language translation
* Emergency classification
* Severity scoring
* Intelligent action recommendations

---

### ⚡ Real-Time System

* Firestore-based live updates
* Instant UI synchronization across devices

---

## 🛠️ Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | Flutter / React Native      |
| Backend  | Node.js + Firebase          |
| Database | Firebase Firestore          |
| Cloud    | Google Cloud Platform (GCP) |
| AI       | Google Gemini API           |
| APIs     | Maps API, Notification APIs |

---

## 📁 Project Structure (High-Level)

```id="q5gmbc"
client/
  ├── mobile-app/       # Flutter / React Native
  ├── web-dashboard/    # React frontend

server/
  ├── routes/
  ├── controllers/
  ├── services/

firebase/
  ├── config/
  ├── firestore/

```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash id="jyd7iy"
git clone https://github.com/your-username/aurashield.git
cd aurashield
```

### 2️⃣ Install Dependencies

```bash id="35d3qk"
npm install
```

### 3️⃣ Run Development Server

```bash id="dhl5n9"
npm run dev
```

---

## 🔌 Environment Variables

Create a `.env` file:

```env id="l7i9cg"
GEMINI_API_KEY=your_api_key_here
FIREBASE_CONFIG=your_config_here
GCP_PROJECT_ID=your_project_id
```

---

## 🧪 Demo Flow

1. Guest reports an emergency via mobile app
2. Backend processes request using AI
3. Alert stored in Firestore
4. Staff dashboard updates in real-time
5. Staff takes action (dispatch / resolve)

---

## ⚠️ Current Limitations (MVP)

* No authentication system
* Static map (no live indoor tracking yet)
* Emergency service APIs are simulated
* Limited real-world integrations

---

## 🔮 Future Enhancements

* 🔐 Authentication & role-based access
* 🗺️ Real-time indoor mapping
* 📡 IoT sensor integration
* 📊 Advanced analytics dashboard
* 📲 Push notifications & alert escalation
* 🤖 Predictive risk detection

---

## 🏆 Use Cases

* Hotels & Resorts
* Smart Campuses
* Hospitals
* Corporate Offices
* Event Venues

---

## 🤝 Contributing

Contributions are welcome!

* Fork the repository
* Create a feature branch
* Submit a pull request

---

## 📜 License

MIT License

---

## 👨‍💻 Author

**Himanish Chatterjee**
Tech Enthusiast | Full Stack Developer | AI Builder

---

## ⭐ Final Note

AuraShield is not just an application —
it’s a system designed to make environments **safer, faster, and smarter using AI**.

If you find this project valuable, consider ⭐ starring the repository.

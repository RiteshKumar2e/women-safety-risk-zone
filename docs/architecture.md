
---

# 📄 `docs/architecture.md`

```md
# System Architecture – Women Safety Risk Zone Prediction System

## Overview

The system follows a **microservice-oriented architecture**, separating:
- Frontend
- Backend API
- ML Prediction Service
- Database layer

---

## 🧩 High-Level Components

### 1️⃣ Frontend (React.js)
- Interactive city map (Leaflet)
- Heatmaps & zone highlighting
- User reporting interface
- Route safety visualization
- Admin analytics dashboard

---

### 2️⃣ Backend Server (Node.js + Express)
- Authentication & authorization
- Crime & report data management
- Route safety aggregation
- ML service orchestration

---

### 3️⃣ Machine Learning Service (Python + FastAPI)
- Predicts numerical risk score (0–100)
- Converts score → LOW / MEDIUM / HIGH
- Exposes `/predict` HTTP endpoint

---

### 4️⃣ Database (MongoDB / PostgreSQL)
- Users
- Crime records
- Crowd reports
- Risk history
- Route risk logs

---

## 🔁 Request Flow (Example)


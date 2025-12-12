# 🛡️ SafeRoute - AI-Powered Urban Safety Platform

<div align="center">

![SafeRoute Banner](https://img.shields.io/badge/SafeRoute-AI%20Safety%20Platform-blue?style=for-the-badge&logo=shield&logoColor=white)

**Real-time crime risk analysis and intelligent route planning for safer urban navigation**

[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python)](https://python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)

[Live Demo](#) · [Documentation](docs/) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 🌟 Overview

SafeRoute is an intelligent urban safety platform that combines machine learning, real-time data analysis, and interactive mapping to help citizens navigate cities more safely. By analyzing crime patterns, user reports, and temporal factors, SafeRoute provides dynamic risk assessments and suggests safer alternative routes.

### ✨ Key Features

```
🗺️  Interactive Risk Heatmap      📊  Predictive Analytics
🛣️  Safe Route Planning            📱  Real-time Incident Reporting  
📈  Crime Trend Analysis           🔔  Location-based Alerts
👮  Admin Dashboard                🔒  Secure Authentication
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  React Frontend (Vite + React Router + Context API)      │  │
│  │  • Interactive Maps (Leaflet/Mapbox)                     │  │
│  │  • Real-time Heatmaps                                    │  │
│  │  • Route Visualization                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ REST API
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Node.js + Express Backend                               │  │
│  │  • JWT Authentication                                    │  │
│  │  • Role-based Access Control                            │  │
│  │  • Business Logic & Data Aggregation                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                     ↕                           ↕
┌──────────────────────────────┐   ┌───────────────────────────────┐
│      DATA LAYER              │   │    ML SERVICE LAYER           │
│  ┌────────────────────────┐  │   │  ┌─────────────────────────┐ │
│  │  MongoDB Database      │  │   │  │  Python ML Service      │ │
│  │  • User Data           │  │   │  │  • Risk Prediction      │ │
│  │  • Crime Records       │  │   │  │  • Pattern Recognition  │ │
│  │  • Reports             │  │   │  │  • Route Scoring        │ │
│  │  • Risk Scores         │  │   │  │  • Model Training       │ │
│  └────────────────────────┘  │   │  └─────────────────────────┘ │
└──────────────────────────────┘   └───────────────────────────────┘
```

---

## 📁 Project Structure

```
SafeRoute/
│
├── 📂 frontend/                    # React Frontend Application
│   ├── src/
│   │   ├── pages/                  # Page Components
│   │   │   ├── MapPage/           # Interactive risk map
│   │   │   ├── ReportPage/        # Incident reporting
│   │   │   ├── RouteSafetyPage/   # Route planning
│   │   │   ├── AdminDashboard/    # Admin analytics
│   │   │   ├── LoginPage/         # Authentication
│   │   │   └── ProfilePage/       # User profile
│   │   │
│   │   ├── components/            # Reusable Components
│   │   │   ├── layout/           # Navbar, Sidebar, Routes
│   │   │   ├── map/              # Map components & layers
│   │   │   ├── reports/          # Report forms & lists
│   │   │   ├── routes/           # Route planning UI
│   │   │   ├── analytics/        # Charts & visualizations
│   │   │   └── common/           # Shared UI elements
│   │   │
│   │   ├── context/              # React Context (Auth, Map)
│   │   ├── services/             # API client & services
│   │   ├── utils/                # Helper functions
│   │   └── styles/               # Global styles
│   │
├── 📂 backend/                    # Node.js Backend API
│   ├── src/
│   │   ├── config/               # Database & env config
│   │   ├── middleware/           # Auth, error handling
│   │   ├── models/               # MongoDB schemas
│   │   ├── controllers/          # Request handlers
│   │   ├── routes/               # API endpoints
│   │   ├── services/             # Business logic
│   │   └── utils/                # JWT, password utils
│   │
├── 📂 ml-service/                 # Python ML Service
│   ├── src/                      # Training & prediction
│   ├── models/                   # Trained ML models
│   ├── data/                     # Datasets
│   └── notebooks/                # Jupyter notebooks
│
├── 📂 docs/                       # Documentation
│   ├── api-spec.md               # API documentation
│   ├── architecture.md           # System design
│   └── ml-design.md              # ML pipeline details
│
└── 📂 infra/                      # Infrastructure configs
```

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+  |  Python 3.9+  |  MongoDB 6+  |  npm/yarn
```

### Installation

1️⃣ **Clone the repository**
```bash
git clone https://github.com/yourusername/saferoute.git
cd saferoute
```

2️⃣ **Setup Frontend**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

3️⃣ **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

4️⃣ **Setup ML Service**
```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/train.py
```

### Environment Variables

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_MAP_API_KEY=your_mapbox_key
```

**Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/saferoute
JWT_SECRET=your_secret_key
ML_SERVICE_URL=http://localhost:8000
PORT=5000
```

**ML Service (.env)**
```env
MODEL_PATH=./models/risk_predictor.pkl
PORT=8000
```

---

## 🎯 Core Features

### 🗺️ Interactive Risk Heatmap
Real-time visualization of crime risk zones with temporal filtering (time of day, day of week) and dynamic color-coded overlays.

### 🛣️ Intelligent Route Planning
Input origin and destination to receive:
- **Primary Route**: Fastest path
- **Safest Route**: Lowest risk alternative
- **Risk Comparison**: Visual and numerical risk scores

### 📊 Predictive Analytics
Machine learning models analyze:
- Historical crime data
- Temporal patterns
- Geographic clustering
- Social indicators

### 📱 Citizen Reporting
Crowdsourced incident reports with:
- Category tagging
- Photo uploads
- Anonymous submission option
- Real-time verification

### 👮 Admin Dashboard
Comprehensive analytics for law enforcement:
- Crime trend analysis
- Hot spot identification
- Report management
- User statistics

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### ML/AI
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)

---

## 📊 Data Models

### User Schema
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  role: ['citizen', 'police', 'admin'],
  createdAt: Date,
  lastLogin: Date
}
```

### Crime Record Schema
```javascript
{
  location: { lat: Number, lng: Number },
  type: String,
  severity: Number,
  timestamp: Date,
  verified: Boolean,
  source: String
}
```

### Risk Score Schema
```javascript
{
  zoneId: String,
  coordinates: [[lat, lng]],
  riskLevel: Number (0-100),
  factors: {
    historicalCrime: Number,
    lighting: Number,
    population: Number,
    timeOfDay: String
  },
  lastUpdated: Date
}
```

---

## 🔒 Security Features

- 🔐 **JWT Authentication**: Secure token-based auth
- 🛡️ **Role-Based Access Control**: Granular permissions
- 🔑 **Password Hashing**: bcrypt encryption
- 🚫 **Input Validation**: Prevents injection attacks
- 📝 **Audit Logging**: Track admin actions
- 🔒 **HTTPS Only**: Encrypted data transmission

---

## 🧪 Testing

```bash
# Frontend Tests
cd frontend
npm run test

# Backend Tests
cd backend
npm run test

# ML Tests
cd ml-service
pytest
```

---

## 📈 Roadmap

- [x] Core platform MVP
- [x] Basic risk prediction model
- [x] Interactive heatmap
- [ ] Mobile application (React Native)
- [ ] Real-time notifications
- [ ] Advanced ML models (Deep Learning)
- [ ] Integration with official crime databases
- [ ] Multi-city support
- [ ] Dark mode UI

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

<div align="center">

| Role | Contributor |
|------|-------------|
| **Lead Developer** | [@yourname](https://github.com/yourname) |
| **ML Engineer** | [@mlexpert](https://github.com/mlexpert) |
| **UI/UX Designer** | [@designer](https://github.com/designer) |
| **Backend Developer** | [@backenddev](https://github.com/backenddev) |

</div>

---

## 📧 Contact

**Project Link**: [https://github.com/yourusername/saferoute](https://github.com/yourusername/saferoute)

**Email**: saferoute@example.com

**Twitter**: [@SafeRouteApp](https://twitter.com/SafeRouteApp)

---

<div align="center">

### ⭐ Star us on GitHub — it motivates us a lot!

Made with ❤️ by the SafeRoute Team

![Visitor Count](https://visitor-badge.laobi.icu/badge?page_id=yourusername.saferoute)

</div>

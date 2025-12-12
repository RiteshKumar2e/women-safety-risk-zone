# Women Safety Risk Zone Prediction System – API Specification

## Base URLs

- Backend API: `http://localhost:5000/api/v1`
- ML Service API: `http://localhost:8000`

---

## 🔐 Authentication APIs

### POST /auth/register
Register a new user.

**Request Body**
```json
{
  "name": "Ritesh Kumar",
  "email": "ritesh@email.com",
  "password": "password123"
}

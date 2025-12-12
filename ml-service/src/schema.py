from pydantic import BaseModel

class RiskPredictionInput(BaseModel):
    lat: float
    lng: float
    hour: int
    day_of_week: int
    crime_frequency: int
    harassment_ratio: float
    night_flag: int

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext

import models
import database

# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI(title="AgriGuard API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SensorData(BaseModel):
    moisture: float
    ph: float
    temperature: float
    humidity: float
    rain_status: int
    solar_power: float
    battery_percentage: float

class FarmerCreate(BaseModel):
    farmerName: str
    mobileNumber: str
    password: str
    farmName: str
    village: str
    district: str
    farmSize: float
    cropType: str

@app.get("/")
def read_root():
    return {"message": "Welcome to AgriGuard API"}

@app.post("/api/register", status_code=status.HTTP_201_CREATED)
def register_farmer(farmer: FarmerCreate, db: Session = Depends(database.get_db)):
    # Check if user already exists
    db_farmer = db.query(models.Farmer).filter(models.Farmer.mobile_number == farmer.mobileNumber).first()
    if db_farmer:
        raise HTTPException(status_code=400, detail="Mobile number already registered")
    
    hashed_password = pwd_context.hash(farmer.password)
    
    new_farmer = models.Farmer(
        farmer_name=farmer.farmerName,
        mobile_number=farmer.mobileNumber,
        password_hash=hashed_password,
        farm_name=farmer.farmName,
        village=farmer.village,
        district=farmer.district,
        farm_size=farmer.farmSize,
        crop_type=farmer.cropType
    )
    
    db.add(new_farmer)
    db.commit()
    db.refresh(new_farmer)
    return {"status": "success", "message": "Farmer registered successfully"}


@app.post("/api/data")
def receive_data(data: SensorData):
    # This will later be connected to Firebase
    return {"status": "success", "data": data}

@app.get("/api/recommendations")
def get_recommendations():
    return {
        "status": "success",
        "recommendations": [
            {
                "id": 1,
                "type": "irrigation",
                "message": "Soil moisture is low. Water the field today."
            },
            {
                "id": 2,
                "type": "ph",
                "message": "Soil pH is slightly acidic. Recommended pH range: 6.5-7."
            }
        ]
    }

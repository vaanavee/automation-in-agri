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

from typing import List

class ZoneCreate(BaseModel):
    zoneName: str
    area: float
    cropType: str

class FarmerCreate(BaseModel):
    farmerName: str
    mobileNumber: str
    password: str
    farmName: str
    village: str
    district: str
    zones: List[ZoneCreate]

class LoginRequest(BaseModel):
    mobileNumber: str
    password: str

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
        district=farmer.district
    )
    
    db.add(new_farmer)
    db.commit()
    db.refresh(new_farmer)

    for zone in farmer.zones:
        new_zone = models.Plantation(
            farmer_id=new_farmer.id,
            zone_name=zone.zoneName,
            area=zone.area,
            crop_type=zone.cropType
        )
        db.add(new_zone)
    db.commit()

    return {"status": "success", "message": "Farmer registered successfully"}

@app.post("/api/login")
def login_farmer(creds: LoginRequest, db: Session = Depends(database.get_db)):
    db_farmer = db.query(models.Farmer).filter(models.Farmer.mobile_number == creds.mobileNumber).first()
    if not db_farmer or not pwd_context.verify(creds.password, db_farmer.password_hash):
        raise HTTPException(status_code=401, detail="Invalid mobile number or password")
    
    zones = db.query(models.Plantation).filter(models.Plantation.farmer_id == db_farmer.id).all()
    
    return {
        "status": "success",
        "farmer": {
            "id": db_farmer.id,
            "farmerName": db_farmer.farmer_name,
            "farmName": db_farmer.farm_name,
            "zones": [
                {
                    "id": z.id,
                    "zoneName": z.zone_name,
                    "area": z.area,
                    "cropType": z.crop_type
                } for z in zones
            ]
        }
    }


latest_sensor_data = None

@app.post("/api/data")
def receive_data(data: SensorData):
    global latest_sensor_data
    latest_sensor_data = data
    # This will later be connected to Firebase
    return {"status": "success", "data": data}

@app.get("/api/data/latest")
def get_latest_data():
    if latest_sensor_data is None:
        return {"status": "waiting", "message": "No sensor data received yet"}
    return {"status": "success", "data": latest_sensor_data}

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

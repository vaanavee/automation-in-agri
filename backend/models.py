from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Plantation(Base):
    __tablename__ = "plantations"
    
    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("farmers.id"))
    direction = Column(String)
    acres = Column(Float)
    crop_type = Column(String)
    
    farmer = relationship("Farmer", back_populates="plantations")

class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    farmer_name = Column(String, index=True)
    mobile_number = Column(String, unique=True, index=True)
    password_hash = Column(String)
    farm_name = Column(String)
    village = Column(String)
    district = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    plantations = relationship("Plantation", back_populates="farmer", cascade="all, delete-orphan")

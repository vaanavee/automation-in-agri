import requests
import time
import random

API_URL = "http://localhost:8000/api/data"

print("===========================================")
print("   AGRIGUARD ARDUINO SOFTWARE SIMULATOR    ")
print("===========================================")
print(f"Sending simulated data to {API_URL} every 5 seconds...\n")

while True:
    # Generate random simulated values
    moisture = round(random.uniform(20.0, 80.0), 1)
    temperature = round(random.uniform(20.0, 35.0), 1)
    humidity = round(random.uniform(40.0, 90.0), 1)
    rain_status = random.choice([0, 1])

    payload = {
        "moisture": moisture,
        "ph": round(random.uniform(6.0, 7.5), 1),
        "temperature": temperature,
        "humidity": humidity,
        "rain_status": rain_status,
        "solar_power": round(random.uniform(10.0, 14.0), 1),
        "battery_percentage": round(random.uniform(80.0, 100.0), 1)
    }
    
    try:
        response = requests.post(API_URL, json=payload, timeout=2)
        print(f"[SUCCESS] Sent: {payload} | Server: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Failed to connect to FastAPI backend: {e}")
        
    time.sleep(5)

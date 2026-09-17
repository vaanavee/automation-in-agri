import serial
import serial.tools.list_ports
import requests
import time
import re
import sys

# The URL of your FastAPI backend running on your laptop
API_URL = "http://localhost:8000/api/data"
BAUD_RATE = 115200

def find_arduino_port():
    """Attempts to find the Arduino COM port automatically."""
    ports = list(serial.tools.list_ports.comports())
    for p in ports:
        # Many Arduino boards show up with 'CH340', 'Arduino', 'UART', or 'Serial'
        if 'CH340' in p.description or 'Arduino' in p.description or 'Serial' in p.description or 'UART' in p.description:
            return p.device
    
    # Fallback to the first available port if we can't find a description match
    if ports:
        return ports[0].device
    return None

def parse_and_send(data_buffer):
    try:
        moisture = 0.0
        temp = 0.0
        hum = 0.0
        rain_status = 0 # 0 no rain, 1 rain
        
        for line in data_buffer:
            if "Soil Moisture" in line:
                match = re.search(r'(\d+)', line)
                if match:
                    moisture = float(match.group(1))
            elif "Air Temperature" in line:
                match = re.search(r'([\d.]+)', line)
                if match:
                    temp = float(match.group(1))
            elif "Air Humidity" in line:
                match = re.search(r'([\d.]+)', line)
                if match:
                    hum = float(match.group(1))
            elif "Rain Status" in line:
                if "RAIN DETECTED" in line:
                    rain_status = 1
                else:
                    rain_status = 0

        # Create the payload matching the SensorData Pydantic model
        payload = {
            "moisture": moisture,
            "ph": 6.8,  # Default dummy since your hardware doesn't measure this yet
            "temperature": temp,
            "humidity": hum,
            "rain_status": rain_status,
            "solar_power": 12.0,
            "battery_percentage": 95.0
        }
        
        response = requests.post(API_URL, json=payload, timeout=2)
        print(f"[SUCCESS] Sent to backend: {payload} | Server Response: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] Failed to connect to FastAPI backend: {e}")
    except Exception as e:
        print(f"[ERROR] Error parsing/sending: {e}")

def main():
    print("===========================================")
    print("   AGRIGUARD ARDUINO SERIAL BRIDGE         ")
    print("===========================================")
    
    # Try to find the port automatically or accept it from command line
    port = sys.argv[1] if len(sys.argv) > 1 else find_arduino_port()
    
    if not port:
        print("[ERROR] Could not automatically detect an Arduino.")
        print("Please specify the COM port manually, e.g.:")
        print("  python serial_bridge.py COM3")
        return

    print(f"Attempting to connect to Arduino on {port}...")
    try:
        ser = serial.Serial(port, BAUD_RATE, timeout=1)
        print(f"[SUCCESS] Successfully connected to {port} at {BAUD_RATE} baud.")
    except Exception as e:
        print(f"[ERROR] Error opening {port}: {e}")
        print("Make sure the Serial Monitor in the Arduino IDE is CLOSED.")
        return

    print("Waiting for Arduino data... (Press Ctrl+C to stop)")
    buffer = []
    
    while True:
        try:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8', errors='ignore').strip()
                if line:
                    print(f"Arduino: {line}")
                    buffer.append(line)
                    
                    # The Arduino code prints a line of dashes at the end of each block
                    if "------------------------------------" in line and len(buffer) > 3:
                        parse_and_send(buffer)
                        buffer = [] # Reset buffer for the next reading
        except KeyboardInterrupt:
            print("\nShutting down bridge...")
            ser.close()
            break
        except Exception as e:
            print(f"Error reading serial: {e}")
            time.sleep(1)

if __name__ == "__main__":
    main()

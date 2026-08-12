from ultralytics import YOLO
import cv2

# Load YOLO model
model = YOLO("yolov8n.pt")

image = cv2.imread(r"C:\Users\DELL\Downloads\depositphotos_128602470-stock-photo-cars-stop-at-a-traffic.jpg")

# Run detection
results = model(image)

# Get detected boxes
boxes = results[0].boxes

# Dictionary to store counts
vehicle_count = {}

# Loop through detections
for box in boxes:

    class_id = int(box.cls[0])
    object_name = model.names[class_id]

    if object_name in vehicle_count:
        vehicle_count[object_name] += 1
    else:
        vehicle_count[object_name] = 1

print("\n===== Detection Summary =====")

for vehicle, count in vehicle_count.items():
    print(f"{vehicle}: {count}")
from ultralytics import YOLO
import cv2

# Load YOLO model
model = YOLO("yolov8n.pt")

# Read image
image = cv2.imread(r"C:\Users\DELL\Downloads\depositphotos_128602470-stock-photo-cars-stop-at-a-traffic.jpg")

# Detect objects
results = model(image)

# Get all detected objects
boxes = results[0].boxes

# Loop through every detected object
for box in boxes:

    # Class ID (0 = person, 2 = car, etc.)
    class_id = int(box.cls[0])

    # Confidence score
    confidence = float(box.conf[0])

    # Object name
    object_name = model.names[class_id]

    print(f"Object: {object_name}")
    print(f"Confidence: {confidence:.2f}")
    print("-" * 30)
from ultralytics import YOLO

class Detector:

    def __init__(self):
        print("Loading YOLO model...")
        self.model = YOLO("yolov8n.pt")
        print("YOLO loaded successfully!")

    def detect(self, image):
        results = self.model(image)
        return results
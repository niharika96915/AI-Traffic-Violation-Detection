from ultralytics import YOLO

class Tracker:

    def __init__(self):
        from config import MODEL_PATH

        self.model = YOLO(MODEL_PATH)

    def track(self, frame):
        results = self.model.track(
            frame,
            persist=True,
            tracker="bytetrack.yaml"
        )

        return results
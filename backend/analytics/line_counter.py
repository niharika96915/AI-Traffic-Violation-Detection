import cv2
from violations.red_light import RedLightViolationDetector
from config import COUNTING_LINE_Y, VEHICLE_CLASSES


class LineCounter:

    def __init__(self):

        self.line_y = COUNTING_LINE_Y

        self.crossed_ids = set()

        self.vehicle_counts = {
            "car": 0,
            "motorcycle": 0,
            "bus": 0,
            "truck": 0
        }
        self.red_light_detector = RedLightViolationDetector()

    def update(self, frame, results):

        boxes = results[0].boxes

        if boxes is None:
            return frame

        # Draw the counting line
        cv2.line(
            frame,
            (0, self.line_y),
            (frame.shape[1], self.line_y),
            (0, 255, 255),
            3
        )

        for box in boxes:

            if box.id is None:
                continue

            track_id = int(box.id[0])

            class_id = int(box.cls[0])

            class_name = results[0].names[class_id]

            if class_name not in VEHICLE_CLASSES:
                continue

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            center_x = (x1 + x2) // 2
            center_y = (y1 + y2) // 2

            # Draw center point
            cv2.circle(frame, (center_x, center_y), 5, (0, 0, 255), -1)

            # Count vehicle once when it reaches the line
            if (
                abs(center_y - self.line_y) <= 20
                and track_id not in self.crossed_ids
            ):

                self.crossed_ids.add(track_id)

                self.vehicle_counts[class_name] += 1
   
                self.red_light_detector.check_violation(
                    track_id,
                    class_name,
                    frame
                )

        return frame

    def draw_counts(self, frame):

        y = 30

        for vehicle, count in self.vehicle_counts.items():

            cv2.putText(
                frame,
                f"{vehicle.capitalize()}: {count}",
                (20, y),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0, 255, 0),
                2,
            )

            y += 30

        return frame
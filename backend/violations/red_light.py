import os
from datetime import datetime
from database.violation_repository import ViolationLogger
import cv2
from violations.anpr import read_plate

from config import TRAFFIC_LIGHT


class RedLightViolationDetector:

    def __init__(self):

        self.violated_ids = set()

        self.output_folder = "../outputs/violations"

        os.makedirs(self.output_folder, exist_ok=True)
        
        self.logger = ViolationLogger()

    def check_violation(self, track_id, class_name, frame):

        if TRAFFIC_LIGHT != "RED":
            return False

        if track_id in self.violated_ids:
            return False

        self.violated_ids.add(track_id)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        filename = (
            f"violation_{track_id}_{timestamp}.jpg"
        )

        filepath = os.path.join(
            self.output_folder,
            filename
        )

        cv2.imwrite(filepath, frame)

        print("\n🚨 RED LIGHT VIOLATION")
        print(f"Vehicle ID   : {track_id}")
        print(f"Vehicle Type : {class_name}")
        print(f"Evidence     : {filepath}")
        
        cv2.imwrite(filepath, frame)

        plate_number = read_plate(filepath)

        print(f"🔤 Number Plate: {plate_number}"
         )
        
        self.logger.log(
            vehicle_id=track_id,
            vehicle_type=class_name,
            violation="Red Light",
            NumberPlate=plate_number,
            timestamp=timestamp,
            evidence=filename
            
        )

        return True
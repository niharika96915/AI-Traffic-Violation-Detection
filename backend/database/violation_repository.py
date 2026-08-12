import csv
import os


class ViolationLogger:

    def __init__(self):

        self.folder = "../outputs/logs"

        os.makedirs(
            self.folder,
            exist_ok=True
        )

        self.file = os.path.join(
            self.folder,
            "violations.csv"
        )

        # Create CSV if it doesn't exist
        if not os.path.exists(self.file):

            with open(
                self.file,
                "w",
                newline="",
                encoding="utf-8"
            ) as f:

                writer = csv.writer(f)

                writer.writerow([
                    "VehicleID",
                    "VehicleType",
                    "NumberPlate",
                    "Violation",
                    "Timestamp",
                    "Evidence"
                ])


    def log(
        self,
        vehicle_id,
        vehicle_type,
        violation,
        NumberPlate,
        timestamp,
        evidence
    ):

        with open(
            self.file,
            "a",
            newline="",
            encoding="utf-8"
        ) as f:

            writer = csv.writer(f)

            writer.writerow([
                vehicle_id,
                vehicle_type,
                NumberPlate,
                violation,
                timestamp,
                evidence
            ])

        print("CSV Updated")
        print(f"Number Plate: {NumberPlate}")
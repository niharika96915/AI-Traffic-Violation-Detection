class VehicleCounter:
    def __init__(self):
        # Store IDs of vehicles that have already been counted
        self.counted_ids = set()

        # Store count of each vehicle type
        self.vehicle_counts = {
            "car": 0,
            "motorcycle": 0,
            "bus": 0,
            "truck": 0
        }

    def update_counts(self, results):
        """
        Update vehicle counts using YOLO tracking results.
        Counts each tracked vehicle only once.
        """

        boxes = results[0].boxes

        # If no detections, return
        if boxes is None:
            return

        for box in boxes:

            # Skip objects without tracking IDs
            if box.id is None:
                continue

            # Tracking ID
            track_id = int(box.id[0])

            # Object class
            class_id = int(box.cls[0])

            # Object name
            class_name = results[0].names[class_id]

            # Ignore objects that are not vehicles
            if class_name not in self.vehicle_counts:
                continue

            # Count only once
            if track_id not in self.counted_ids:
                self.counted_ids.add(track_id)
                self.vehicle_counts[class_name] += 1

    def get_counts(self):
        """
        Return the current vehicle counts.
        """
        return self.vehicle_counts

    def display_counts(self):
        """
        Print vehicle counts in the terminal.
        """

        print("\n========== Vehicle Count ==========")

        for vehicle, count in self.vehicle_counts.items():
            print(f"{vehicle.capitalize():12}: {count}")

        print("===================================\n")
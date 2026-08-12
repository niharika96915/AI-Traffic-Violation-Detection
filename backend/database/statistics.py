from collections import Counter
from database.csv_reader import get_all_violations


def get_statistics():

    violations = get_all_violations()

    total = len(violations)

    vehicle_counter = Counter()

    violation_counter = Counter()

    for row in violations:

        vehicle_counter[row["VehicleType"]] += 1

        violation_counter[row["Violation"]] += 1

    return {
        "total_violations": total,
        "vehicle_counts": dict(vehicle_counter),
        "violation_counts": dict(violation_counter)
    }
import csv
import os

CSV_PATH = "../outputs/logs/violations.csv"


def get_all_violations():

    if not os.path.exists(CSV_PATH):
        return []

    with open(CSV_PATH, "r", newline="") as file:

        reader = csv.DictReader(file)

        return list(reader)
def get_recent_violations(limit=10):

    violations = get_all_violations()

    return violations[::-1][:limit]
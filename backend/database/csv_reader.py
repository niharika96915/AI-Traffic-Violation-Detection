import csv
import os

# Project root → outputs → logs → violations.csv
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

CSV_PATH = os.path.join(
    BASE_DIR,
    "outputs",
    "logs",
    "violations.csv"
)


def get_all_violations():

    if not os.path.exists(CSV_PATH):
        return []

    with open(
        CSV_PATH,
        "r",
        newline="",
        encoding="utf-8"
    ) as file:

        reader = csv.DictReader(file)

        return list(reader)


def get_recent_violations(limit=10):

    violations = get_all_violations()

    return violations[::-1][:limit]
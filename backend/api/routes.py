from database.statistics import get_statistics
from database.csv_reader import get_all_violations
from fastapi import APIRouter
from database.csv_reader import (
    get_all_violations,
    get_recent_violations
)
from fastapi.responses import FileResponse
import os
from fastapi.responses import FileResponse
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)
import csv
from collections import Counter

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Welcome to AI Traffic Violation Detection API"
    }


@router.get("/health")
def health():
    return {
        "status": "running",
        "version": "1.0.0"
    }
@router.get("/violations")
def get_violations():

    return get_all_violations()
@router.get("/statistics")
def statistics():

    return get_statistics()
@router.get("/recent")
def recent():

    return get_recent_violations()
@router.get("/evidence/{filename}")
def get_evidence(filename: str):

    path = os.path.join(
        "../outputs/violations",
        filename
    )

    if not os.path.exists(path):
        return {"error": "Image not found"}

    return FileResponse(path)
@router.get("/export/csv")
def export_csv():

    file_path = "violations/violations.csv"

    if not os.path.exists(file_path):
        return {
            "message": "No violation data available"
        }

    return FileResponse(
        path=file_path,
        filename="traffic_violations.csv",
        media_type="text/csv"
    )
@router.get("/export/pdf")
def export_pdf():

    csv_path = "violations/violations.csv"
    pdf_path = "violations/traffic_violation_report.pdf"

    if not os.path.exists(csv_path):
        return {
            "message": "No violation data available"
        }

    data = []

    with open(csv_path, "r", newline="", encoding="utf-8") as file:

        reader = csv.DictReader(file)

        for row in reader:
            data.append([
                row.get("VehicleID", ""),
                row.get("VehicleType", ""),
                row.get("Violation", ""),
                row.get("Timestamp", "")
            ])

    document = SimpleDocTemplate(
        pdf_path,
        pagesize=A4
    )

    styles = getSampleStyleSheet()

    elements = []

    title = Paragraph(
        "AI-Based Traffic Violation Report",
        styles["Title"]
    )

    elements.append(title)
    elements.append(Spacer(1, 20))

    elements.append(
        Paragraph(
            f"Total Violations: {len(data)}",
            styles["Normal"]
        )
    )

    elements.append(Spacer(1, 15))

    table_data = [
        [
            "Vehicle ID",
            "Vehicle Type",
            "Violation",
            "Timestamp"
        ]
    ]

    table_data.extend(data)

    table = Table(table_data)

    table.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 1, colors.grey),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 8),
        ])
    )

    elements.append(table)

    document.build(elements)

    return FileResponse(
        path=pdf_path,
        filename="traffic_violation_report.pdf",
        media_type="application/pdf"
    )
@router.get("/vehicle-history/{number_plate}")
def vehicle_history(number_plate: str):

    csv_file = "../outputs/logs/violations.csv"

    if not os.path.exists(csv_file):
        return {
            "number_plate": number_plate,
            "total_violations": 0,
            "violations": []
        }

    violations = []

    with open(
        csv_file,
        "r",
        newline="",
        encoding="utf-8"
    ) as file:

        reader = csv.DictReader(file)

        for row in reader:

            plate = (
                row.get("NumberPlate") or ""
            ).strip().upper()

            if plate == number_plate.strip().upper():

                violations.append(row)


    violation_counts = Counter(
        row.get("Violation", "Unknown")
        for row in violations
    )

    # =========================
    # Risk Score
    # =========================

    total_violations = len(violations)

    risk_score = min(
        total_violations * 15,
        100
    )

    if risk_score >= 80:
        risk_level = "CRITICAL"

    elif risk_score >= 60:
        risk_level = "HIGH"

    elif risk_score >= 30:
        risk_level = "MEDIUM"

    else:
        risk_level = "LOW"


    repeat_offender = total_violations >= 3


    return {
    "number_plate": number_plate,

    "total_violations": total_violations,

    "violation_counts": dict(
        violation_counts
    ),

    "risk_score": risk_score,

    "risk_level": risk_level,

    "repeat_offender": repeat_offender,

    "violations": violations
}
@router.get("/debug-csv")
def debug_csv():

    from database.csv_reader import CSV_PATH
    import os

    return {
        "csv_path": CSV_PATH,
        "exists": os.path.exists(CSV_PATH),
        "size": os.path.getsize(CSV_PATH)
        if os.path.exists(CSV_PATH)
        else 0
    }
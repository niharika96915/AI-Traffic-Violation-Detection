import easyocr
import cv2
import re
import os

reader = easyocr.Reader(["en"], gpu=False)


def clean_text(text):
    text = text.upper()
    return re.sub(r"[^A-Z0-9]", "", text)


def read_plate(image_path):

    if not os.path.exists(image_path):
        return "UNKNOWN"

    image = cv2.imread(image_path)

    if image is None:
        return "UNKNOWN"

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    gray = cv2.equalizeHist(gray)

    edges = cv2.Canny(
        gray,
        100,
        200
    )

    contours, _ = cv2.findContours(
        edges,
        cv2.RETR_LIST,
        cv2.CHAIN_APPROX_SIMPLE
    )

    for contour in contours:

        x, y, w, h = cv2.boundingRect(contour)

        if h == 0:
            continue

        ratio = w / h

        if (
            2.0 <= ratio <= 6.0
            and w > 80
            and h > 20
        ):

            plate = image[
                y:y+h,
                x:x+w
            ]

            results = reader.readtext(plate)

            for detection in results:

                text = detection[1]
                confidence = detection[2]

                if confidence >= 0.30:

                    text = clean_text(text)

                    if len(text) >= 4:
                        return text

    return "UNKNOWN"
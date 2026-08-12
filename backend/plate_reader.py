import easyocr
import cv2
import os
import re


reader = easyocr.Reader(
    ["en"],
    gpu=False
)


def clean_plate_text(text):

    text = text.upper()

    # Keep only letters and numbers
    text = re.sub(
        r"[^A-Z0-9]",
        "",
        text
    )

    return text


def read_number_plate(image_path):

    if not os.path.exists(image_path):

        print("Image not found:", image_path)

        return None


    image = cv2.imread(image_path)

    if image is None:

        print("Could not read image")

        return None


    # Convert image to grayscale
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )


    # Improve contrast
    gray = cv2.equalizeHist(gray)


    # Detect edges
    edges = cv2.Canny(
        gray,
        100,
        200
    )


    # Find contours
    contours, _ = cv2.findContours(
        edges,
        cv2.RETR_LIST,
        cv2.CHAIN_APPROX_SIMPLE
    )


    plate_candidates = []


    for contour in contours:

        x, y, w, h = cv2.boundingRect(
            contour
        )

        if h == 0:
            continue


        aspect_ratio = w / h


        # Number plates are generally wider
        if (
            2.0 <= aspect_ratio <= 6.0
            and w > 80
            and h > 20
        ):

            plate_candidates.append(
                (x, y, w, h)
            )


    best_text = None


    for x, y, w, h in plate_candidates:

        plate = image[
            y:y+h,
            x:x+w
        ]


        results = reader.readtext(
            plate
        )


        for detection in results:

            text = detection[1]
            confidence = detection[2]


            if confidence > 0.30:

                cleaned = clean_plate_text(
                    text
                )


                if len(cleaned) >= 4:

                    best_text = cleaned

                    print(
                        "Possible plate:",
                        best_text,
                        "Confidence:",
                        round(confidence, 2)
                    )

                    return best_text


    print(
        "No clear number plate detected."
    )

    return None


if __name__ == "__main__":

    image_path = input(
        "Enter vehicle image path: "
    )


    result = read_number_plate(
        image_path
    )


    print("\n==============================")

    print(
        "Detected Number Plate:",
        result
    )

    print(
        "==============================")
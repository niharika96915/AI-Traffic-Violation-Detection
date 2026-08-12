import cv2

camera = cv2.VideoCapture(0)


def generate_frames():

    while True:

        success, frame = camera.read()

        if not success:
            break

        # Encode frame as JPEG
        success, buffer = cv2.imencode(
            ".jpg",
            frame
        )

        if not success:
            continue

        frame_bytes = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + frame_bytes
            + b"\r\n"
        )
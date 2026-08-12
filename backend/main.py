import cv2

from tracking.tracker import Tracker
from detection.counter import VehicleCounter
from analytics.line_counter import LineCounter

tracker = Tracker()
counter = VehicleCounter()
line_counter = LineCounter()

from config import VIDEO_PATH

video = cv2.VideoCapture(r"C:\Users\DELL\Downloads\13926765_3840_2160_24fps.mp4")
cv2.namedWindow("Traffic Tracking", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Traffic Tracking", 800, 600)
while True:

    success, frame = video.read()

    if not success:
        break

    
    results = tracker.track(frame)

    annotated = results[0].plot()

    annotated = line_counter.update(
         annotated,
         results
)

    annotated = line_counter.draw_counts(
    annotated
)

    

    cv2.imshow("Traffic Tracking", annotated)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

video.release()
cv2.destroyAllWindows()

counter.display_counts()
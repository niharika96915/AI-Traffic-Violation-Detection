from ultralytics import YOLO
import cv2

model = YOLO("yolov8n.pt")

image = cv2.imread(r"C:\Users\DELL\Downloads\depositphotos_128602470-stock-photo-cars-stop-at-a-traffic.jpg")

results = model(image)

annotated = results[0].plot()

cv2.imshow("Detection", annotated)

cv2.waitKey(0)
cv2.destroyAllWindows()
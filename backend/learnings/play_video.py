import cv2

video = cv2.VideoCapture(r"C:\Users\DELL\Downloads\13926765_3840_2160_24fps.mp4")
cv2.namedWindow("Traffic Tracking", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Traffic Tracking", 800, 600)
while True:
    ret, frame = video.read()

    if not ret:
        break
    
    cv2.imshow("Traffic Tracking", frame)

    if cv2.waitKey(25) & 0xFF == ord('q'):
        break

video.release()
cv2.destroyAllWindows()
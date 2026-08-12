import cv2
image = cv2.imread(r"C:\Users\DELL\Downloads\depositphotos_128602470-stock-photo-cars-stop-at-a-traffic.jpg")
cv2.imshow("Traffic Image", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
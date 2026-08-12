import cv2

image = cv2.imread(r"C:\Users\DELL\Downloads\depositphotos_128602470-stock-photo-cars-stop-at-a-traffic.jpg")

print("Image Shape:", image.shape)

pixel = image[100, 200]

print("Pixel Value:", pixel)
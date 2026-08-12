import cv2
image = cv2.imread(r"C:\Users\DELL\Downloads\depositphotos_128602470-stock-photo-cars-stop-at-a-traffic.jpg")

cv2.rectangle(image,(100,100),(300,250),(0,255,0),3)
cv2.circle(image,(200,175),40,(255,0,0),3)
cv2.line(image,(50,50),(500,350),(0,0,255),2)
cv2.putText(image,"Car",(100,90),cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,255),2)

cv2.imshow("Drawing Demo",image)
cv2.waitKey(0)
cv2.destroyAllWindows()
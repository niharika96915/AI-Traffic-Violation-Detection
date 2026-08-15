from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router
from fastapi.responses import StreamingResponse
from camera_stream import generate_frames

app = FastAPI(
    title="AI Traffic Violation Detection API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ai-traffic-violation-detection-h92aal118.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
@app.get("/camera-test")
def camera_test():
    return {
        "status": "Camera streaming endpoint is ready"
    }
@app.get("/video-feed")
def video_feed():

    return StreamingResponse(
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )
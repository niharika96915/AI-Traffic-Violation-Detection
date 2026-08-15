# 🚦 AI Traffic Violation Detection System

An AI-powered traffic monitoring system that detects traffic violations, identifies vehicle types and number plates, maintains violation records, and provides a real-time web dashboard for monitoring and analysis.

## 🌐 Live Demo

**Frontend:**  
https://ai-traffic-violation-detection-h92aal118.vercel.app/

**Backend API:**  
https://ai-traffic-violation-detection-3.onrender.com/

## ✨ Features

- 🚗 Vehicle detection and classification
- 🔢 Automatic Number Plate Recognition (ANPR)
- 🚨 Traffic violation detection
- 📋 Automatic violation logging
- 📊 Real-time statistics dashboard
- 🔎 Vehicle history using number plates
- ⚠️ Risk score and repeat-offender detection
- 🎥 Live camera feed
- 📄 CSV violation records
- 📑 PDF violation report generation
- 🔗 REST API for frontend-backend communication
- ☁️ Cloud deployment with Vercel and Render

## 🏗️ System Workflow

```text
Camera / Video Feed
        ↓
Vehicle Detection
        ↓
Number Plate Recognition
        ↓
Violation Detection
        ↓
Violation Logger
        ↓
CSV Database
        ↓
FastAPI Backend
        ↓
React Dashboard
        ↓
Statistics / History / Risk Analysis

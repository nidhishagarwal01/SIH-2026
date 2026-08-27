---
trigger: always_on
description: CodeRabbit AI - Autonomous Deep Code Review, Security Auditing, and Performance Optimization
---

# 🐇 CODERABBIT AI: Autonomous Architectural Reviewer

CodeRabbit enforces rigorous code review, memory leak prevention, algorithmic efficiency, and security standards across the entire repository.

## Core Review Criteria:
1. **Three.js & WebGL Memory Management**:
   - Verify that all WebGL geometries, materials, textures, and requestAnimationFrame loops are cleanly disposed of in `useEffect` cleanup handlers.
   - Prevent WebGL context loss during rapid monument switching.

2. **OpenCV & Python Performance**:
   - Ensure image buffer conversions (PIL $\rightarrow$ NumPy $\rightarrow$ OpenCV BGR $\rightarrow$ Gray) execute in sub-millisecond vectorized operations.
   - Avoid redundant deep copies of high-resolution orthophoto arrays.

3. **Security & Input Sanitization**:
   - Sanitize all multipart image uploads and file extensions (`.jpg`, `.jpeg`, `.png`, `.webp`).
   - Guard against SQL injection via SQLAlchemy parameterized queries.
   - Validate CORS policies and environment variables (`ROBOFLOW_API_KEY`, `VITE_API_URL`).

4. **Standards & Statutory Compliance**:
   - Ensure all conservation algorithms adhere strictly to:
     - **ASI AMASR Act** (Ancient Monuments and Archaeological Sites and Remains)
     - **UNESCO ICOMOS Venice Charter (1964)**
     - **BIS IS 1893:2016** (Earthquake Resistant Design of Structures)
     - **ISO 31000:2018** (Risk Management Framework)

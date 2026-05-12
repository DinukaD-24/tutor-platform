# System Design

# High-Level Architecture

Students and tutors access the platform through a web browser.

Frontend:
- Next.js application

Backend Services:
- Firebase Authentication
- Firestore Database
- Firebase Storage

External Services:
- YouTube video embedding

Hosting:
- Vercel

---

# Main Components

## Frontend
Responsible for:
- User interface
- Routing
- Lesson pages
- Tutor pages

---

## Authentication
Responsible for:
- User login
- User signup
- Session handling

---

## Database
Stores:
- Tutor information
- Subject data
- Lesson metadata
- PDF links

---

## Storage
Stores:
- PDF study materials
- Tutor profile images

---

# Initial Architecture Diagram

Frontend (Next.js)
    ↓
Firebase Services
    ↓
Firestore Database
    ↓
Storage + Authentication

External:
YouTube Embedded Videos
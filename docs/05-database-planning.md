# Database Planning

# Collections Overview

## Users Collection

Fields:
- id
- name
- email
- role
- bio
- profileImage
- createdAt

---

## Subjects Collection

Fields:
- id
- subjectName
- syllabusType
- gradeLevel

---

## Lessons Collection

Fields:
- id
- tutorId
- subjectId
- title
- description
- youtubeUrl
- pdfUrl
- createdAt

---

# Relationships

One Tutor:
- can upload many lessons

One Subject:
- can contain many lessons

One Lesson:
- belongs to one tutor
- belongs to one subject
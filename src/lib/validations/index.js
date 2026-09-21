import { z } from "zod";

/**
 * Validation schema for Tutor Applications (become-a-tutor)
 */
export const tutorApplicationSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters long").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  university: z.string().optional().nullable(),
  tutorType: z.string().optional().default("Private Tutor"),
  subjects: z.string().min(2, "Subjects taught are required"),
  syllabuses: z.string().min(2, "Syllabuses taught are required"),
  grades: z.string().optional().default(""),
  mediums: z.string().optional().default("English, Sinhala"),
  location: z.string().optional().nullable(),
  onlineAvailable: z.boolean().optional().default(true),
  physicalAvailable: z.boolean().optional().default(false),
  experience: z.string().optional().nullable(),
  bio: z.string().min(10, "Bio description must be at least 10 characters"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")).nullable(),
  teachingStyle: z.string().optional().nullable(),
});

/**
 * Validation schema for general Contact messages
 */
export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject line is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters long").max(5000),
});

/**
 * Validation schema for Student Tuition Requests
 */
export const tuitionRequestSchema = z.object({
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  studentEmail: z.string().email("Valid email address is required"),
  syllabus: z.string().min(2, "Syllabus selection is required"),
  gradeOrAge: z.string().min(1, "Grade or age target is required"),
  subject: z.string().min(2, "Subject is required"),
  classType: z.string().optional().default("Revision & Theory"),
  mode: z.string().optional().default("Online & Physical"),
  location: z.string().optional().nullable(),
  message: z.string().min(10, "Tuition request message must be at least 10 characters"),
});

/**
 * Validation schema for Video Lesson Creation/Update
 */
export const lessonSchema = z.object({
  title: z.string().min(3, "Lesson title must be at least 3 characters").max(200),
  youtubeId: z.string().min(3, "YouTube video link or ID is required"),
  subject: z.string().optional(),
  topicName: z.string().optional(),
  syllabusSlug: z.string().optional(),
  gradeSlug: z.string().optional(),
  tutorId: z.string().optional(),
  description: z.string().optional().nullable(),
  addToProfile: z.boolean().optional(),
});

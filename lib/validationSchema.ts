import { z } from "zod"

export const LoginFormSchema = z.object({
    email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .min(5, { message: 'Email must be at least 5 characters.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
})

export const CreateLessonFormSchema = z.object({
    curriculum_unit_id: z.int().min(1, "Please select curriculum"),
    topic: z.string().min(3, "Topic is required."),
    subject: z.string().min(3, "Subject is required"),
    grade: z.int().min(1, "Please Select Grade"),
    duration: z.int().min(1, "Please select duration"),
    no_of_questions: z.int().min(1, "Please provide number of questions that you want for assessment."),
    lesson_outcome: z.string().min(5, "Lesson outcome is required")
})
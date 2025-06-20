import { ExperienceLevel, JobType, WorkMode } from "@/services/jobPost-service";
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be valid" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const recruiterSchema = z.object({
  companyName: z
    .string()
    .min(3, { message: "Name must be at least 2 characters long" })
    .max(255),
  companyLocation: z.tuple([z.string(), z.string().optional()]),
  websiteUrl: z.string().url({ message: "Invalid url" }).min(7).max(255),
  businessStream: z.string(),
  establishmentDate: z.coerce.date().refine((date) => date <= new Date(), {
    message: "Date should be before today ",
  }),
  description: z.string().optional(),
  companyLogo: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  Proffession: z.string().min(1, "Profession is required."),
  phone: z.string().optional(),
  linkedinUrl: z.string().min(1, "LinkedIn URL is required.").optional(),
  githubUrl: z.string().min(1, "GitHub URL is required.").optional(),
  personalWebsiteUrl: z
    .string()
    .min(1, "Personal website URL is required.")
    .optional(),
  twitterUrl: z.string().min(1, "Twitter URL is required.").optional(),
  experienceLevel: z.string().min(1, "Experience level is required."),
  dateOfBirth: z.coerce
    .date()
    .optional()
    .refine(
      (date) => date !== undefined && date < new Date(),
      "Date of birth cannot be in the future."
    ),
  currentAnnualSalary: z
    .number()
    .min(0, "Salary cannot be negative.")
    .optional(),
  bio: z.string().min(1, "Bio is required."),
});

export const jobPostSchema = z.object({
  jobTitle: z
    .string()
    .min(10, { message: "Job title must be at least 10 characters." })
    .max(2000, { message: "Job title cannot exceed 2000 characters." }),

  jobType: z.nativeEnum(JobType, {
    message: "Please select a valid job type.",
  }),

  location: z.tuple([
    z.string().min(1, { message: "Country is required." }),
    z.string().optional(),
  ]),

  workMode: z.nativeEnum(WorkMode, {
    message: "Please select a valid work mode.",
  }),

  salary: z
    .number()
    .min(1, { message: "Salary must be a positive number." })
    .max(1000000, { message: "Salary cannot exceed 1,000,000." }),

  experienceLevel: z.nativeEnum(ExperienceLevel, {
    message: "Please select a valid experience level.",
  }),

  applicationDeadline: z.coerce
    .date()
    .min(new Date(), { message: "Deadline must be at least tomorrow." }),

  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters." })
    .max(5000, { message: "Description cannot exceed 5000 characters." }),
});

export const jobApplicationSchema = z.object({
  phone_number: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)), // treat empty string as undefined if needed

  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),

  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "First name cannot be empty"),

  lastName: z.string().min(1, "Last name cannot be empty").optional(),

  experience: z
    .number({ required_error: "Experience is required" })
    .min(0, "Experience must be at least 0 years")
    .max(20, "Experience must not exceed 20 years"),

  location: z
    .string({ required_error: "Location is required" })
    .min(1, "Location cannot be empty"),

  resume: z
    .string({ required_error: "Resume is required" })
    .min(1, "Resume file is required"),

  coverLetter: z
    .string({ required_error: "Cover letter is required" })
    .max(1000, "Cover letter must not exceed 1000 characters"),
});

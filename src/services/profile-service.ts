import { UserResponse } from "@/app/auth/register/RegisterForm";
import apiClient from "./api-client";
import { JobType, ExperienceLevel } from "./jobPost-service";

export enum EducationLevel {
  HIGH_SCHOOL = "HIGH_SCHOOL",
  BACHELORS = "BACHELORS",
  MASTERS = "MASTERS",
  DOCTORATE = "DOCTORATE",
}

export interface ExperienceResponse {
  id: number;
  isCurrentJob: boolean;
  jobType: JobType;
  jobTitle: string;
  companyName: string;
  jobLocation: string;
  description: string;
  startDate: string; // ISO date string, e.g. "2024-06-10"
  endDate: string; // ISO date string
}

export interface SkillSetResponse {
  id: number;
  jobSeekerId: number;
  skill: string;
  description: string;
}

export interface EducationResponse {
  id: number;
  jobSeekerId: number;
  educationLevel: EducationLevel;
  fieldOfStudy: string;
  institution: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  certificateUrl: string;
}

export interface JobSeekerProfileResponse {
  id: number;
  jobSeeker: UserResponse;
  currentAnnualSalary: number;
  bio: string;
  profession: string;
  personalWebsiteUrl: string;
  linkedInUrl: string;
  gitHubUrl: string;
  twitterUrl: string;
  dateOfBirth: string; // ISO date string
  experienceLevel: ExperienceLevel;
  experiences: ExperienceResponse[];
  skills: SkillSetResponse[];
  educations: EducationResponse[];
}

export async function findJobSeekerProfile(
  id: number,
  cookieHeader: string
): Promise<JobSeekerProfileResponse> {
  return apiClient
    .get(`job-seekers/${id}`, { headers: { Cookie: cookieHeader } })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
}

import apiClient from "./api-client";
import { UserResponse } from "./auth-service";
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
  dateOfBirth: string;
  phone: string;
  experienceLevel: ExperienceLevel;
  experiences: ExperienceResponse[];
  skills: SkillSetResponse[];
  educations: EducationResponse[];
}

export interface JobSeekerProfileRequest {
  currentAnnualSalary: number;
  bio: string;
  profession: string;
  personalWebsiteUrl: string;
  linkedInUrl: string;
  gitHubUrl: string;
  twitterUrl: string;
  dateOfBirth: string;
  phone: string;
  experienceLevel: ExperienceLevel;
}

export interface EducationRequest {
  educationLevel: EducationLevel;
  location: string;
  fieldOfStudy: string;
  institution: string;
  startDate?: string; // ISO date
  endDate?: string; // ISO date
  certificateUrl?: string;
  gpa: string;
}

export interface ExperienceRequest {
  isCurrentJob: boolean;
  jobType: JobType;
  jobTitle: string;
  companyName: string;
  jobLocation?: string;
  description?: string;
  startDate?: string; // ISO date
  endDate?: string; // ISO date
}

export interface SkillRequest {
  skill: string;
  description?: string;
}

export async function findJobSeekerProfile(id: number) {
  return apiClient
    .get<JobSeekerProfileResponse>(`job-seekers/${id}`)
    .then((res) => res.data);
}

export async function updateJobSeekerProfile(
  profileData: JobSeekerProfileRequest
) {
  return await apiClient.patch<JobSeekerProfileResponse>(
    `job-seekers/me`,
    profileData
  );
}

export async function createJobSeeerProfile(
  profileData: JobSeekerProfileRequest
) {
  return apiClient.post<JobSeekerProfileResponse>("job-seekers", profileData);
}

// ---------- Added: Education / Experience / Skills CRUD (client -> backend controllers) ----------

export async function createEducation(
  jobSeekerId: number,
  request: EducationRequest
) {
  return apiClient
    .post<EducationResponse>(`job-seekers/${jobSeekerId}/education`, request)
    .then((res) => res.data);
}

export async function updateEducation(
  jobSeekerId: number,
  id: number,
  request: EducationRequest
) {
  return apiClient
    .patch<EducationResponse>(
      `job-seekers/${jobSeekerId}/education/${id}`,
      request
    )
    .then((res) => res.data);
}

export async function deleteEducation(jobSeekerId: number, id: number) {
  return apiClient
    .delete<void>(`job-seekers/${jobSeekerId}/education/${id}`)
    .then((res) => res.data);
}

export async function fetchEducations(jobSeekerId: number) {
  return apiClient
    .get<EducationResponse[]>(`job-seekers/${jobSeekerId}/education`)
    .then((res) => res.data);
}

/**
 * Experience endpoints
 * Backend controller: POST /api/v1/job-seekers/experiences
 *                 GET  /api/v1/job-seekers/experiences/{jobSeekerId}  -> List<ExperienceResponse>
 *                 PATCH/DELETE /api/v1/job-seekers/experiences/{id}
 */
export async function createExperience(
  request: ExperienceRequest,
  jobSeekerId: number
) {
  return apiClient
    .post<ExperienceResponse>(`job-seekers/${jobSeekerId}/experiences`, request)
    .then((res) => res.data);
}

export async function updateExperience(
  id: number,
  jobSeekerId: number,
  request: ExperienceRequest
) {
  return apiClient
    .patch<ExperienceResponse>(
      `job-seekers/${jobSeekerId}/experiences/${id}`,
      request
    )
    .then((res) => res.data);
}

export async function deleteExperience(id: number, jobSeekerId: number) {
  return apiClient
    .delete<void>(`job-seekers/${jobSeekerId}/experiences/${id}`)
    .then((res) => res.data);
}

export async function fetchExperiences(jobSeekerId: number) {
  return apiClient
    .get<ExperienceResponse[]>(`job-seekers/${jobSeekerId}/experiences`)
    .then((res) => res.data);
}

/**
 * Skills (skillset) endpoints
 * Assumption: controller exposes similar paths under api/v1/job-seekers/skills
 * If backend path differs adjust accordingly.
 */
export async function createSkill(request: SkillRequest, jobSeekerId: number) {
  return apiClient
    .post<SkillSetResponse>(`job-seekers/${jobSeekerId}/skills`, request)
    .then((res) => res.data);
}

export async function updateSkill(
  id: number,
  jobSeekerId: number,
  request: SkillRequest
) {
  return apiClient
    .patch<SkillSetResponse>(`job-seekers/${jobSeekerId}/skills/${id}`, request)
    .then((res) => res.data);
}

export async function deleteSkill(id: number, jobSeekerId: number) {
  return apiClient
    .delete<void>(`job-seekers/${jobSeekerId}/skills/${id}`)
    .then((res) => res.data);
}

export async function fetchSkills(jobSeekerId: number) {
  return apiClient
    .get<SkillSetResponse[]>(`job-seekers/${jobSeekerId}/skills`)
    .then((res) => res.data);
}

// ---------- Added: Certifications CRUD (client -> backend controller) ----------

export interface CertificationResponse {
  id: number;
  jobSeekerId: number;
  name: string;
  issuer: string;
  date?: string; // ISO date
  credentialId?: string;
  certificateUrl?: string;
}

export interface CertificationRequest {
  name: string;
  issuer: string;
  date?: string; // ISO date
  credentialId?: string;
  certificateUrl?: string;
}

export async function createCertification(
  request: CertificationRequest,
  jobSeekerId: number
) {
  return apiClient
    .post<CertificationResponse>(
      `job-seekers/${jobSeekerId}/certifications`,
      request
    )
    .then((res) => res.data);
}

export async function updateCertification(
  id: number,
  jobSeekerId: number,
  request: CertificationRequest
) {
  return apiClient
    .patch<CertificationResponse>(
      `job-seekers/${jobSeekerId}/certifications/${id}`,
      request
    )
    .then((res) => res.data);
}

export async function deleteCertification(id: number, jobSeekerId: number) {
  return apiClient
    .delete<void>(`job-seekers/${jobSeekerId}/certifications/${id}`)
    .then((res) => res.data);
}

export async function fetchCertifications(jobSeekerId: number) {
  return apiClient
    .get<CertificationResponse[]>(`job-seekers/${jobSeekerId}/certifications`)
    .then((res) => res.data);
}

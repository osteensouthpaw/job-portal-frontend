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
  phone: string; // ISO date string
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

/**
 * Education endpoints
 * Backend controller: POST /api/v1/job-seeker/education
 *                 GET  /api/v1/job-seeker/education/{jobSeekerId}  -> List<EducationResponse>
 *                 PATCH/DELETE /api/v1/job-seeker/education/{id}
 */
export async function createEducation(request: EducationRequest) {
  return apiClient
    .post<EducationResponse>("job-seeker/education", request)
    .then((res) => res.data);
}

export async function updateEducation(id: number, request: EducationRequest) {
  return apiClient
    .patch<EducationResponse>(`job-seeker/education/${id}`, request)
    .then((res) => res.data);
}

export async function deleteEducation(id: number) {
  return apiClient
    .delete<void>(`job-seeker/education/${id}`)
    .then((res) => res.data);
}

/**
 * Retrieve education list for a job seeker (controller signature uses a path variable id)
 * Example: GET /api/v1/job-seeker/education/{jobSeekerId}
 */
export async function fetchEducations(jobSeekerId: number) {
  return apiClient
    .get<EducationResponse[]>(`job-seeker/education/${jobSeekerId}`)
    .then((res) => res.data);
}

/**
 * Experience endpoints
 * Backend controller: POST /api/v1/job-seeker/experiences
 *                 GET  /api/v1/job-seeker/experiences/{jobSeekerId}  -> List<ExperienceResponse>
 *                 PATCH/DELETE /api/v1/job-seeker/experiences/{id}
 */
export async function createExperience(request: ExperienceRequest) {
  return apiClient
    .post<ExperienceResponse>("job-seeker/experiences", request)
    .then((res) => res.data);
}

export async function updateExperience(id: number, request: ExperienceRequest) {
  return apiClient
    .patch<ExperienceResponse>(`job-seeker/experiences/${id}`, request)
    .then((res) => res.data);
}

export async function deleteExperience(id: number) {
  return apiClient
    .delete<void>(`job-seeker/experiences/${id}`)
    .then((res) => res.data);
}

export async function fetchExperiences(jobSeekerId: number) {
  return apiClient
    .get<ExperienceResponse[]>(`job-seeker/experiences/${jobSeekerId}`)
    .then((res) => res.data);
}

/**
 * Skills (skillset) endpoints
 * Assumption: controller exposes similar paths under api/v1/job-seeker/skills
 * If backend path differs adjust accordingly.
 */
export async function createSkill(request: SkillRequest) {
  return apiClient
    .post<SkillSetResponse>("job-seeker/skills", request)
    .then((res) => res.data);
}

export async function updateSkill(id: number, request: SkillRequest) {
  return apiClient
    .patch<SkillSetResponse>(`job-seeker/skills/${id}`, request)
    .then((res) => res.data);
}

export async function deleteSkill(id: number) {
  return apiClient
    .delete<void>(`job-seeker/skills/${id}`)
    .then((res) => res.data);
}

export async function fetchSkills(jobSeekerId: number) {
  return apiClient
    .get<SkillSetResponse[]>(`job-seeker/skills/${jobSeekerId}`)
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

/**
 * Certifications endpoints
 * Assumed backend paths:
 *  POST   /api/v1/job-seeker/certifications
 *  GET    /api/v1/job-seeker/certifications/{jobSeekerId}
 *  PATCH  /api/v1/job-seeker/certifications/{id}
 *  DELETE /api/v1/job-seeker/certifications/{id}
 */
export async function createCertification(request: CertificationRequest) {
  return apiClient
    .post<CertificationResponse>("api/v1/job-seeker/certifications", request)
    .then((res) => res.data);
}

export async function updateCertification(
  id: number,
  request: CertificationRequest
) {
  return apiClient
    .patch<CertificationResponse>(
      `api/v1/job-seeker/certifications/${id}`,
      request
    )
    .then((res) => res.data);
}

export async function deleteCertification(id: number) {
  return apiClient
    .delete<void>(`api/v1/job-seeker/certifications/${id}`)
    .then((res) => res.data);
}

export async function fetchCertifications(jobSeekerId: number) {
  return apiClient
    .get<CertificationResponse[]>(
      `api/v1/job-seeker/certifications/${jobSeekerId}`
    )
    .then((res) => res.data);
}

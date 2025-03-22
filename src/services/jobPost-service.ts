import { AxiosRequestConfig } from "axios";
import apiClient from "./api-client";

export interface OrganizationResponse {
  id: number;
  companyName: string;
  description: string;
  businessStreamId: number;
  establishmentDate: string;
  companyLocation: string;
  websiteUrl: string;
}

export interface JobPostResponse {
  id: number;
  organization: OrganizationResponse;
  location: string;
  jobTitle: string;
  description: string;
  jobType: JobType;
  workMode: WorkMode;
  experienceLevel: ExperienceLevel;
  salary: number;
  isOpen: boolean;
  applicationDeadline: string; // Assuming LocalDateTime is converted to string
  createdAt: string; // Assuming LocalDateTime is converted to string
}

export enum JobType {
  CONTRACT = "CONTRACT",
  FULL_TIME = "FULL_TIME",
  INTERNSHIP = "INTERNSHIP",
}

export enum WorkMode {
  REMOTE = "REMOTE",
  ON_SITE = "ON_SITE",
  HYBRID = "HYBRID",
}

export enum ExperienceLevel {
  ENTRY_LEVEL = "ENTRY_LEVEL",
  JUNIOR = "JUNIOR",
  PROFESSIONAL = "PROFESSIONAL",
  SENIOR = "SENIOR",
}

interface FetchJobPostsResponse {
  content: JobPostResponse[];
  totalElements: number;
}

class JobPostService {
  async jobPosts(filters: Record<string, string>) {
    const params = new URLSearchParams(filters).toString();
    const url = `/job-posts${params ? `?${params}` : ""}`;
    return apiClient
      .get<FetchJobPostsResponse>(url)
      .then((res) => res.data.content);
  }
}

export default new JobPostService();

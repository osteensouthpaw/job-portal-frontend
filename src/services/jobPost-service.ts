import { notFound } from "next/navigation";
import apiClient from "./api-client";
import { UserResponse } from "@/app/auth/register/RegisterForm";
import { PageResponse } from "@/components/general/Pagination";

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
  recruiter: UserResponse;
  organization: OrganizationResponse;
  location: string;
  jobTitle: string;
  description: string;
  jobType: JobType;
  workMode: WorkMode;
  experienceLevel: ExperienceLevel;
  salary: number;
  isOpen: boolean;
  totalApplications: number;
  totalLikes: number;
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

class JobPostService {
  async jobPosts(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters).toString();
    const url = `/job-posts${params ? `?${params}` : ""}`;
    return apiClient
      .get<PageResponse<JobPostResponse>>(url)
      .then((res) => res.data);
  }

  async getJobPostById(jobPostId: number) {
    return apiClient
      .get<JobPostResponse>("/job-posts/" + jobPostId)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return notFound();
      });
  }

  async getJobPostsByRecruiter() {
    return apiClient.get<PageResponse<JobPostResponse>>("/");
  }

  async getLikedJobPosts(cookieHeader?: string) {
    return apiClient.get<PageResponse<JobPostResponse>>(
      "/job-posts/liked-posts",
      { headers: { Cookie: cookieHeader } }
    );
  }

  async toggleLike(jobPostId: number) {
    return apiClient.post<boolean>(`/job-posts/${jobPostId}/like`);
  }

  async isLiked(jobPostId: number) {
    return apiClient.get<boolean>(`/job-posts/${jobPostId}/is-liked`);
  }
}

export default new JobPostService();

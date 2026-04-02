import { notFound } from "next/navigation";
import apiClient from "./api-client";
import { PageResponse } from "@/components/general/Pagination";
import { UserResponse } from "./auth-service";

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

export interface JobPostRequest {
  jobTitle: string;
  jobDescription: string;
  salary: number;
  location: string;
  jobType: JobType;
  workMode: WorkMode;
  experienceLevel: ExperienceLevel;
  applicationDeadline: string;
}

class JobPostService {
  async jobPosts(filters?: Record<string, any>) {
    console.log;
    return apiClient
      .get<PageResponse<JobPostResponse>>("/job-posts", { params: filters })
      .then((res) => res.data);
  }

  getJobPostById = (jobPostId: number) => {
    return apiClient.get<JobPostResponse>("/job-posts/" + jobPostId);
  };

  async getJobPostsByRecruiter() {
    return apiClient.get<PageResponse<JobPostResponse>>("/");
  }

  getLikedJobPosts = async () => {
    return apiClient
      .get<PageResponse<JobPostResponse>>("/job-posts/liked-posts")
      .then((res) => res.data);
  };

  toggleLike = (jobPostId: number) => {
    return apiClient.post<boolean>(`/job-posts/${jobPostId}/like`);
  };

  isLiked = (jobPostId: number) => {
    return apiClient.get<boolean>(`/job-posts/${jobPostId}/is-liked`);
  };

  createJobPost = (jobPost: JobPostRequest) => {
    return apiClient.post<JobPostResponse>("/job-posts", jobPost);
  };

  editJobPost = (jobPost: JobPostRequest, jobPostId: number) => {
    return apiClient.patch<JobPostResponse>(`job-posts/${jobPostId}`, jobPost);
  };

  deleteJobPost = (jobPostId: number) => {
    return apiClient.delete<void>(`job-posts/${jobPostId}`);
  };
}

export default new JobPostService();

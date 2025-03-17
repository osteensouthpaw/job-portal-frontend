import apiClient from "./api-client";

export interface JobPost {
  id: number;
  location: string;
  jobTitle: string;
  description: string;
  hourlyRate: number;
  jobType: JobType;
  workMode: WorkMode;
  experienceLevel: ExperienceLevel;
  createdAt: string;
  applicationDeadline: string;
}

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  FREELANCE = "FREELANCE",
}

export enum WorkMode {
  REMOTE = "REMOTE",
  ONSITE = "ONSITE",
  HYBRID = "HYBRID",
}

export enum ExperienceLevel {
  JUNIOR = "JUNIOR",
  MID = "MID",
  SENIOR = "SENIOR",
}

interface FetchJobPostsResponse {
  content: JobPost[];
  totalElements: number;
}

class JobPostService {
  async jobPosts() {
    return apiClient
      .get<FetchJobPostsResponse>("/job-posts")
      .then((res) => res.data.content);
  }
}

export default new JobPostService();

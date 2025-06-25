import { PageResponse } from "@/components/general/Pagination";
import apiClient from "./api-client";
import { UserResponse } from "@/app/auth/register/RegisterForm";
import { JobPostResponse } from "./jobPost-service";

enum ApplicationStatus {
  APPLIED = "APPLIED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export interface JobApplicationResponse {
  appliedUser: UserResponse;
  appliedPost: JobPostResponse;
  applicationStatus: ApplicationStatus;
  resumeUrl: string;
  coverLetter: string;
  appliedDate: string; // Assuming LocalDateTime is converted to string
}

export interface JobApplicationRequest {
  jobPostId: number;
  resumeUrl: string;
  coverLetter: string;
}

// Get all job applications for the current logged in user (job seeker)
export async function userJobApplications(cookieHeader?: string) {
  return await apiClient
    .get<PageResponse<JobApplicationResponse>>(`/job-applications`, {
      headers: { Cookie: cookieHeader },
    })
    .then((res) => res.data);
}

export async function createJobApplication({
  jobPostId,
  resumeUrl,
  coverLetter,
}: JobApplicationRequest) {
  return await apiClient.post<JobApplicationResponse>(`/job-applications`, {
    jobPostId,
    resumeUrl,
    coverLetter,
  });
}

export async function findApplicationByUser(
  jobPostId: number,
  applicantId: number,
  cookieHeader?: string
) {
  return await apiClient.get<JobApplicationResponse>(
    `/job-applications/${jobPostId}/applicants/${applicantId}`,
    { headers: { Cookie: cookieHeader } }
  );
}

export async function deleteApplication(
  jobPostId: number,
  cookieHeader?: string
) {
  return apiClient.delete(`/job-applications/${jobPostId}`, {
    headers: { Cookie: cookieHeader },
  });
}

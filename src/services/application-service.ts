import { PageResponse } from "@/components/general/Pagination";
import apiClient from "./api-client";
import { JobPostResponse } from "./jobPost-service";
import { UserResponse } from "./auth-service";

export enum ApplicationStatus {
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
export async function userJobApplications() {
  return apiClient
    .get<PageResponse<JobApplicationResponse>>(`/job-applications`)
    .then((res) => res.data);
}

export async function createJobApplication({
  jobPostId,
  resumeUrl,
  coverLetter,
}: JobApplicationRequest) {
  return apiClient.post<JobApplicationResponse>(`/job-applications`, {
    jobPostId,
    resumeUrl,
    coverLetter,
  });
}

export async function findApplicationByUser(
  jobPostId: number,
  applicantId: number,
) {
  return apiClient.get<JobApplicationResponse>(
    `/job-posts/${jobPostId}/applicants/${applicantId}`,
  );
}

export async function deleteApplication(jobPostId: number) {
  return apiClient.delete<void>(`/job-applications/${jobPostId}`);
}

export async function getApplicationsForJobPost(jobPostId: number) {
  return apiClient.get<PageResponse<JobApplicationResponse>>(
    `/job-posts/${jobPostId}/applications`,
  );
}

export async function getRecentApplicationsForRecruiter() {
  return apiClient.get<PageResponse<JobApplicationResponse>>(
    `recruiters/job-applications`,
  );
}

export async function acceptApplication({
  applicantId,
  jobPostId,
}: {
  applicantId: number;
  jobPostId: number;
}) {
  return apiClient.patch<void>(`/job-applications/accept`, null, {
    params: { applicantId, jobPostId },
  });
}

export async function rejectApplication({
  applicantId,
  jobPostId,
}: {
  applicantId: number;
  jobPostId: number;
}) {
  return apiClient.patch<void>(`/job-applications/reject`, null, {
    params: { applicantId, jobPostId },
  });
}

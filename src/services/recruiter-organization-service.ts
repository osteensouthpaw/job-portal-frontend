import apiClient from "./api-client";

export interface BusinessStreamResponse {
  id: number;
  businessName: string;
}

export interface OrganizationCreateRequest {
  companyName: string;
  companyLocation: string;
  websiteUrl: string;
  businessStreamId: number;
  establishmentDate: string; // ISO string
  description: string;
  // NOTE: contact fields might be part of backend; keep them out until API is confirmed.
}

export interface OrganizationResponse {
  id: number;
  companyName: string;
  description: string;
  businessStreamId: number;
  establishmentDate: string;
  companyLocation: string;
  websiteUrl: string;
}

export async function getBusinessStreams() {
  return apiClient
    .get<BusinessStreamResponse[]>("organizations/business-streams")
    .then((res) => res.data);
}

export async function createOrganization(request: OrganizationCreateRequest) {
  return apiClient
    .post<OrganizationResponse>("/organizations", request)
    .then((res) => res.data);
}

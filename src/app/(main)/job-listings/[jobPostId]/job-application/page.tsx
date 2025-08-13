import JobApplicationCard from "./JobApplicationCard";

interface Props {
  params: Promise<{ jobPostId: string }>;
}

const JobApplicationDetailPage = async ({ params }: Props) => {
  const { jobPostId } = await params;

  return <JobApplicationCard jobPostId={jobPostId} />;
};

export default JobApplicationDetailPage;

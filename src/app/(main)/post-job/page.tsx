import { Card } from "@/components/ui/card";
import JobPostForm from "./_components/JobPostForm";
import Testimonials from "./_components/Testimonials";

const NewJobPostPage = async () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <JobPostForm />
        </Card>
      </div>
      <div className="col-span-1">
        <Testimonials />
      </div>
    </div>
  );
};

export default NewJobPostPage;

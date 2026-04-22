import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Calendar, DollarSign, Eye, MapPin, Trash2 } from "lucide-react";
import { WithdrawConfirmModal } from "@/app/(main)/job-listings/[jobPostId]/job-application/WithdrawConfirmationModal";
import { useDeleteJobApplication } from "@/hooks/useApplications";
import { useState } from "react";
import { toast } from "sonner";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
interface Props {
  app: any;
  config: any;
}

const JobApplicationCard = ({ app, config }: Props) => {
  const router = useRouter();
  const StatusIcon = config.icon;

  const deleteApplication = useDeleteJobApplication();

  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  const handleWithdraw = async () => {
    try {
      await deleteApplication.mutateAsync(app.id);
      toast.success("Application withdrawn");
      setShowWithdrawConfirm(false);
    } catch (e) {
      toast.error("Failed to withdraw application");
    }
  };

  return (
    <Card key={app.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Company Logo */}
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage src={app.logo} />
            <AvatarFallback className="rounded-lg bg-muted">
              {app.company.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Job Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-foreground mb-1 truncate">{app.title}</h3>
                <p className="text-muted-foreground truncate">{app.company}</p>
              </div>
              <Badge className={config.className}>
                <StatusIcon className="h-3.5 w-3.5 mr-1" />
                {config.label}
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {app.description}
            </p>

            {/* Job Meta */}
            <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {app.location}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {app.salary}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Applied on: {new Date(app.appliedDate).toDateString()}
              </span>
              <Badge
                variant="secondary"
                className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
              >
                {app.type}
              </Badge>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  router.push(`/job-listings/${app.id}/job-application`)
                }
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                View Details
              </Button>
              <Button
                onClick={() => setShowWithdrawConfirm(true)}
                variant="ghost"
                size="sm"
                className="gap-2 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Withdraw
              </Button>
            </div>

            <WithdrawConfirmModal
              open={showWithdrawConfirm}
              onConfirm={handleWithdraw}
              onCancel={() => setShowWithdrawConfirm(false)}
              loading={deleteApplication.isPending}
              jobTitle={app.title}
              companyName={app.company}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobApplicationCard;

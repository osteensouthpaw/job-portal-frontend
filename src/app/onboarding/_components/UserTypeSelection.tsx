import { Button } from "@/components/ui/button";
import { Building2, UserRound } from "lucide-react";
import { UserType } from "../../auth/register/RegisterForm";

interface Props {
  onSelect: (type: UserType) => void;
}

export default function UserTypeSelection({ onSelect }: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold ">Welcome! Let&apos;s get started</h2>
        <p className="text-muted-foreground">
          Choose how you&apos;d like to use our platform
        </p>
      </div>

      <div className="grid gap-4">
        <Button
          onClick={() => onSelect(UserType.RECRUITER)}
          variant="outline"
          className="w-full h-auto p-6 flex items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Company / Organization</h3>
            <p className="text-sm text-muted-foreground">
              Post jobs and find great talent
            </p>
          </div>
        </Button>

        <Button
          onClick={() => onSelect(UserType.JOB_SEEKER)}
          variant="outline"
          className="w-full h-auto p-6 flex items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserRound className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Job Seeker</h3>
            <p className="text-sm text-muted-foreground">
              Find your dream job opportunity
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
}

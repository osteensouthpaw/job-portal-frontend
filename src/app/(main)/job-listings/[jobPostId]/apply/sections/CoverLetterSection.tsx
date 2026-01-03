import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ApplicationFormData } from "./PersonalInfoSection";

const CoverLetterSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ApplicationFormData>();

  const coverLetterValue = watch("coverLetter");
  const coverLetterProgress = Math.min(
    ((coverLetterValue?.length || 0) / 500) * 100,
    100
  );

  return (
    <div>
      <Label htmlFor="coverLetter">
        Tell us why you're a great fit *
        {errors.coverLetter && (
          <span className="text-destructive text-xs ml-1">
            ({errors.coverLetter.message})
          </span>
        )}
      </Label>
      <Textarea
        id="coverLetter"
        {...register("coverLetter", {
          required: "Cover letter is required",
          minLength: {
            value: 100,
            message: "Cover letter must be at least 100 characters",
          },
        })}
        placeholder="Explain why you're interested in this position and what makes you a great fit for the role..."
        className={`mt-1 min-h-[200px] ${
          errors.coverLetter ? "border-destructive" : ""
        }`}
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-muted-foreground">
          {coverLetterValue?.length || 0} / 500 characters (minimum 100)
        </span>
        <Progress value={coverLetterProgress} className="w-32 h-1" />
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <p className="text-blue-900 dark:text-blue-300 text-sm mb-1">
              Tips for a great cover letter:
            </p>
            <ul className="text-blue-700 dark:text-blue-400 text-xs space-y-1 list-disc list-inside">
              <li>Highlight relevant experience and skills</li>
              <li>Show enthusiasm for the role and company</li>
              <li>Explain what you can bring to the team</li>
              <li>Keep it concise and focused</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterSection;

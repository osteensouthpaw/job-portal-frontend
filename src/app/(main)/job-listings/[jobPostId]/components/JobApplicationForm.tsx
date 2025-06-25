"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { jobApplicationSchema } from "@/schemas/validationSchemas";
import {
  createJobApplication,
  JobApplicationRequest,
} from "@/services/application-service";
import { JobSeekerProfileResponse } from "@/services/profile-service";
import { UploadDropzone } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;

interface Props {
  jobSeekerProfile: JobSeekerProfileResponse;
}

export default function JobApplicationForm({ jobSeekerProfile }: Props) {
  const [isUploadComplete, setUploadComplete] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const jobPostId = parseInt(params.jobPostId!.toString());

  const form = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      phone_number: jobSeekerProfile.phone,
      email: jobSeekerProfile.jobSeeker.email,
      firstName: jobSeekerProfile.jobSeeker.firstName,
      lastName: jobSeekerProfile.jobSeeker.lastName,
      experience: 0,
      location: "",
      resumeUrl: "",
      coverLetter: "",
    },
  });

  function onSubmit(values: JobApplicationFormData) {
    const applicationRequest: JobApplicationRequest = {
      jobPostId,
      resumeUrl: values.resumeUrl,
      coverLetter: values.coverLetter,
    };
    setLoading(true);
    createJobApplication(applicationRequest)
      .then((res) => {
        res.data;
        toast.success("application successful!");
        router.back();
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Something went wrong ${err}`);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          disabled
          control={form.control}
          name="phone_number"
          render={() => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Phone number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput readOnly value={jobSeekerProfile.phone} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled
          control={form.control}
          name="email"
          render={() => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  value={jobSeekerProfile.jobSeeker.email}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              disabled
              control={form.control}
              name="firstName"
              render={() => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      type="text"
                      value={jobSeekerProfile.jobSeeker.firstName}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              disabled
              control={form.control}
              name="lastName"
              render={() => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      value={jobSeekerProfile.jobSeeker.lastName}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                This is how long you've worked professionally
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="location" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resumeUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <FileText />
                      <p className="text-muted-foreground text-sm">
                        {fileName}
                      </p>
                    </div>
                    <Trash2
                      className="text-muted-foreground cursor-pointer hover:text-red-500 transition-colors"
                      size={20}
                      onClick={() => field.onChange("")}
                    />
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="resumeUploader"
                    onUploadProgress={(progress) => {
                      toast.info(`Upload progress: ${progress}%`);
                    }}
                    onClientUploadComplete={(res) => {
                      field.onChange(res[0].serverData.fileUrl);
                      setUploadComplete(true);
                      setFileName(res[0].name);
                      console.log({ res });
                      toast.success("Upload Successful");
                    }}
                    onUploadError={(error: Error) => {
                      console.log(error);
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                    className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
                  />
                )}
              </FormControl>
              {!isUploadComplete && (
                <FormDescription>Select a file to upload.</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="text here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isUploadComplete || isLoading}>
          Apply
        </Button>
      </form>
    </Form>
  );
}

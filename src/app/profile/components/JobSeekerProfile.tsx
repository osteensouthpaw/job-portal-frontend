"use client";

import {
  CertificationRequest,
  CertificationResponse,
  EducationLevel,
  EducationRequest,
  EducationResponse,
  ExperienceRequest,
  ExperienceResponse,
  JobSeekerProfileRequest,
  SkillRequest,
  SkillSetResponse,
  updateJobSeekerProfile,
} from "@/services/profile-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddCertification,
  useFetchCertification,
  useRemoveCertification,
  useUpdateCertification,
} from "@/hooks/useCertifications";
import {
  useAddEducation,
  useEducation,
  useRemoveEducation,
  useUpdateEducation,
} from "@/hooks/useEducation";
import {
  useAddExperience,
  useExperiences,
  useRemoveExperience,
  useUpdateExperience,
} from "@/hooks/useExperiences";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import {
  useAddSkill,
  useFetchSkills,
  useRemoveSkill,
  useUpdateSkill,
} from "@/hooks/useSkillsets";
import { UserResponse } from "@/services/auth-service";
import { ExperienceLevel, JobType } from "@/services/jobPost-service";
import {
  Award,
  Briefcase,
  Calendar,
  Edit,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  MapPin,
  Phone,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import "react-day-picker/dist/style.css";
import { CertificationDialog } from "./dialogs/CertificationDialog";
import { EducationDialog } from "./dialogs/EducationDialog";
import { ExperienceDialog } from "./dialogs/ExperienceDialog";
import { SkillDialog } from "./dialogs/SkillDialog";

interface Props {
  user: UserResponse;
}

export const ProfilePage = ({ user }: Props) => {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useJobSeekerProfile(user.id);

  // Experience Query
  const { data: experiences = [], isLoading: expLoading } = useExperiences(
    user.id
  );

  // Education Query
  const { data: educations = [], isLoading: eduLoading } = useEducation(
    user.id
  );

  // Skills Query
  const { data: skills = [], isLoading: skillsLoading } = useFetchSkills(
    user.id
  );

  // Certifications Query
  const { data: certifications = [], isLoading: certsLoading } =
    useFetchCertification(user.id);

  // Profile Edit Form
  const [isEditing, setIsEditing] = useState(false);
  const {
    control,
    handleSubmit,
    reset: resetProfileForm,
    formState: { isDirty },
  } = useForm<JobSeekerProfileRequest>({
    defaultValues: useMemo(
      () =>
        profile
          ? {
              currentAnnualSalary: profile.currentAnnualSalary,
              bio: profile.bio,
              profession: profile.profession,
              personalWebsiteUrl: profile.personalWebsiteUrl,
              linkedInUrl: profile.linkedInUrl,
              gitHubUrl: profile.gitHubUrl,
              twitterUrl: profile.twitterUrl,
              dateOfBirth: profile.dateOfBirth,
              phone: profile.phone,
              experienceLevel: profile.experienceLevel,
            }
          : undefined,
      [profile]
    ),
    values: profile
      ? {
          currentAnnualSalary: profile.currentAnnualSalary,
          bio: profile.bio,
          profession: profile.profession,
          personalWebsiteUrl: profile.personalWebsiteUrl,
          linkedInUrl: profile.linkedInUrl,
          gitHubUrl: profile.gitHubUrl,
          twitterUrl: profile.twitterUrl,
          dateOfBirth: profile.dateOfBirth,
          phone: profile.phone,
          experienceLevel: profile.experienceLevel,
        }
      : undefined,
  });

  // Profile Update Mutation
  const updateProfileMutation = useMutation({
    mutationFn: updateJobSeekerProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
    },
    onError: () => toast.error("Failed to update profile"),
  });

  // Experience Dialog State
  const [expDialogOpen, setExpDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceResponse | null>(null);

  // Education Dialog State
  const [eduDialogOpen, setEduDialogOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EducationResponse | null>(null);

  // Skill Dialog State
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillSetResponse | null>(
    null
  );

  // Certification Dialog State
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationResponse | null>(
    null
  );

  // --- Experience Form ---
  const {
    control: expControl,
    handleSubmit: handleExpSubmit,
    reset: resetExpForm,
  } = useForm<ExperienceRequest>({
    defaultValues: editingExp
      ? {
          isCurrentJob: editingExp.isCurrentJob,
          jobType: editingExp.jobType,
          jobTitle: editingExp.jobTitle,
          companyName: editingExp.companyName,
          jobLocation: editingExp.jobLocation,
          description: editingExp.description,
          startDate: editingExp.startDate,
          endDate: editingExp.endDate,
        }
      : {
          isCurrentJob: false,
          jobType: JobType.FULL_TIME,
          jobTitle: "",
          companyName: "",
          jobLocation: "",
          description: "",
          startDate: "",
          endDate: "",
        },
  });

  // --- Education Form ---
  const {
    control: eduControl,
    handleSubmit: handleEduSubmit,
    reset: resetEduForm,
  } = useForm<EducationRequest>({
    defaultValues: editingEdu
      ? {
          educationLevel: editingEdu.educationLevel,
          location: editingEdu.institution,
          fieldOfStudy: editingEdu.fieldOfStudy,
          institution: editingEdu.institution,
          startDate: editingEdu.startDate,
          endDate: editingEdu.endDate,
          certificateUrl: editingEdu.certificateUrl,
          gpa: "",
        }
      : {
          educationLevel: EducationLevel.BACHELORS,
          location: "",
          fieldOfStudy: "",
          institution: "",
          startDate: "",
          endDate: "",
          certificateUrl: "",
          gpa: "",
        },
  });

  // --- Skill Form ---
  const {
    control: skillControl,
    handleSubmit: handleSkillSubmit,
    reset: resetSkillForm,
  } = useForm<SkillRequest>({
    defaultValues: editingSkill
      ? {
          skill: editingSkill.skill,
          description: editingSkill.description,
        }
      : {
          skill: "",
          description: "",
        },
  });

  // --- Certification Form ---
  const {
    control: certControl,
    handleSubmit: handleCertSubmit,
    reset: resetCertForm,
  } = useForm<CertificationRequest>({
    defaultValues: editingCert
      ? {
          name: editingCert.name,
          issuer: editingCert.issuer,
          date: editingCert.date,
          credentialId: editingCert.credentialId,
          certificateUrl: editingCert.certificateUrl,
        }
      : {
          name: "",
          issuer: "",
          date: "",
          credentialId: "",
          certificateUrl: "",
        },
  });

  // --- Experience Handlers ---
  const onMutateExperience = () => {
    setExpDialogOpen(false);
    setEditingExp(null);
    queryClient.invalidateQueries({ queryKey: ["experiences", user.id] });
  };

  const expMutation = editingExp
    ? useUpdateExperience(user.id, editingExp.id, onMutateExperience)
    : useAddExperience(user.id, onMutateExperience);

  const expDeleteMutation = useRemoveExperience(user.id, () => {
    toast.success("Experience removed");
    queryClient.invalidateQueries({ queryKey: ["experiences", user.id] });
  });

  // --- Education Handlers ---
  const onMutateEducation = () => {
    setEduDialogOpen(false);
    setEditingEdu(null);
    queryClient.invalidateQueries({ queryKey: ["educations", user.id] });
  };

  const eduMutation = editingEdu
    ? useUpdateEducation(user.id, editingEdu.id, onMutateEducation)
    : useAddEducation(user.id, onMutateEducation);

  const eduDeleteMutation = useRemoveEducation(user.id, () => {
    toast.success("Education removed");
    queryClient.invalidateQueries({ queryKey: ["educations", user.id] });
  });

  // --- Skill Handlers ---
  const onMutateSkill = () => () => {
    toast.success("Skill added successfully");
    setSkillDialogOpen(false);
    setEditingSkill(null);
    queryClient.invalidateQueries({ queryKey: ["skills", user.id] });
  };

  const skillMutation = editingSkill
    ? useUpdateSkill(editingSkill.id, user.id, onMutateSkill)
    : useAddSkill(user.id, onMutateSkill);

  const skillDeleteMutation = useRemoveSkill(user.id, () => {
    toast.success("Skill removed");
    queryClient.invalidateQueries({ queryKey: ["skills", user.id] });
  });

  // --- Certification Handlers ---
  const onMutateCertification = () => {
    setCertDialogOpen(false);
    setEditingCert(null);
    queryClient.invalidateQueries({ queryKey: ["certifications", user.id] });
  };

  const certMutation = editingCert
    ? useUpdateCertification(editingCert.id, user.id, onMutateCertification)
    : useAddCertification(user.id, onMutateCertification);

  const certDeleteMutation = useRemoveCertification(user.id, () => {
    toast.success("Certification removed");
    queryClient.invalidateQueries({ queryKey: ["certifications", user.id] });
  });

  // --- UI Handlers ---
  const handleEditExperience = (exp: ExperienceResponse) => {
    setEditingExp(exp);
    resetExpForm({
      isCurrentJob: exp.isCurrentJob,
      jobType: exp.jobType,
      jobTitle: exp.jobTitle,
      companyName: exp.companyName,
      jobLocation: exp.jobLocation,
      description: exp.description,
      startDate: exp.startDate,
      endDate: exp.endDate,
    });
    setExpDialogOpen(true);
  };

  const handleEditEducation = (edu: EducationResponse) => {
    setEditingEdu(edu);
    resetEduForm({
      educationLevel: edu.educationLevel,
      location: edu.institution,
      fieldOfStudy: edu.fieldOfStudy,
      institution: edu.institution,
      startDate: edu.startDate,
      endDate: edu.endDate,
      certificateUrl: edu.certificateUrl,
      gpa: "",
    });
    setEduDialogOpen(true);
  };

  const handleEditSkill = (skill: SkillSetResponse) => {
    setEditingSkill(skill);
    resetSkillForm({
      skill: skill.skill,
      description: skill.description,
    });
    setSkillDialogOpen(true);
  };

  const handleEditCertification = (cert: CertificationResponse) => {
    setEditingCert(cert);
    resetCertForm({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      credentialId: cert.credentialId,
      certificateUrl: cert.certificateUrl,
    });
    setCertDialogOpen(true);
  };

  // --- Profile Completion Calculation ---
  const profileCompletion = useMemo(() => {
    if (!profile) return 0;
    let filled = 0;
    const total = 7;
    if (profile.profession) filled++;
    if (profile.bio) filled++;
    if (profile.personalWebsiteUrl) filled++;
    if (profile.linkedInUrl) filled++;
    if (profile.gitHubUrl) filled++;
    if (profile.phone) filled++;
    if (profile.experienceLevel) filled++;
    return Math.round((filled / total) * 100);
  }, [profile]);

  // --- Skills by Category ---
  const skillsByCategory = useMemo(() => {
    const acc: Record<string, SkillSetResponse[]> = {};
    skills.forEach((skill) => {
      const cat = skill.description || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
    });
    return acc;
  }, [skills]);

  // --- Render ---
  if (profileLoading) return <div>Loading...</div>;
  if (profileError) return <div>Failed to load profile.</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and professional details
          </p>
        </div>
      </div>

      {/* Profile Completion */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground">Profile Completion</span>
                <span className="text-green-600 dark:text-green-400">
                  {profileCompletion}%
                </span>
              </div>
              <Progress value={profileCompletion} className="h-2 mb-2" />
              <p className="text-muted-foreground text-sm">
                Complete your profile to increase your chances of getting hired
              </p>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setIsEditing((v) => !v);
                resetProfileForm();
              }}
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              {isEditing && (
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleSubmit((data) =>
                    updateProfileMutation.mutate(data)
                  )}
                  disabled={!isDirty}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-3xl">
                      {profile?.jobSeeker.firstName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Button>
                  )}
                </div>
                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="profession">Profession *</Label>
                      <Controller
                        name="profession"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="profession"
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio *</Label>
                      <Controller
                        name="bio"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            id="bio"
                            disabled={!isEditing}
                            className="mt-1 min-h-[100px]"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="personalWebsiteUrl">
                        <Globe className="h-4 w-4 inline mr-1" />
                        Website
                      </Label>
                      <Controller
                        name="personalWebsiteUrl"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="personalWebsiteUrl"
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedInUrl">
                        <Linkedin className="h-4 w-4 inline mr-1" />
                        LinkedIn
                      </Label>
                      <Controller
                        name="linkedInUrl"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="linkedInUrl"
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gitHubUrl">
                        <Github className="h-4 w-4 inline mr-1" />
                        GitHub
                      </Label>
                      <Controller
                        name="gitHubUrl"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="gitHubUrl"
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">
                        <Phone className="h-4 w-4 inline mr-1" />
                        Phone
                      </Label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="phone"
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="experienceLevel">Experience Level</Label>
                    <Controller
                      name="experienceLevel"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          disabled={!isEditing}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="experienceLevel" className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ExperienceLevel).map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work Experience</CardTitle>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => {
                  setEditingExp(null);
                  resetExpForm();
                  setExpDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Add Experience
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {expLoading ? (
                <div>Loading...</div>
              ) : experiences.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground mb-2">
                    No work experience added yet
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Add your work experience to showcase your career journey
                  </p>
                </div>
              ) : (
                experiences.map((exp) => (
                  <div key={exp.id} className="border-b border-border pb-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Briefcase className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <div>
                            <h4 className="text-foreground">{exp.jobTitle}</h4>
                            <p className="text-muted-foreground">
                              {exp.companyName}
                            </p>
                          </div>
                          {exp.isCurrentJob && (
                            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.jobLocation}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exp.startDate} -{" "}
                            {exp.isCurrentJob ? "Present" : exp.endDate}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          {exp.description}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleEditExperience(exp)}
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-destructive"
                            onClick={() => expDeleteMutation.mutate(exp.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => {
                  setEditingEdu(null);
                  resetEduForm();
                  setEduDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Add Education
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {eduLoading ? (
                <div>Loading...</div>
              ) : educations.length === 0 ? (
                <div className="text-center py-8">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground mb-2">No education added yet</p>
                  <p className="text-muted-foreground text-sm">
                    Add your educational background
                  </p>
                </div>
              ) : (
                educations.map((edu) => (
                  <div key={edu.id} className="border-b border-border pb-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <div>
                            <h4 className="text-foreground">
                              {edu.fieldOfStudy}
                            </h4>
                            <p className="text-muted-foreground">
                              {edu.institution}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {edu.institution}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleEditEducation(edu)}
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-destructive"
                            onClick={() => eduDeleteMutation.mutate(edu.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills & Expertise</CardTitle>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => {
                  setEditingSkill(null);
                  resetSkillForm();
                  setSkillDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Add Skill
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillsLoading ? (
                <div>Loading...</div>
              ) : skills.length === 0 ? (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground mb-2">No skills added yet</p>
                  <p className="text-muted-foreground text-sm">
                    Add your professional skills
                  </p>
                </div>
              ) : (
                Object.entries(skillsByCategory).map(
                  ([category, categorySkills]) => (
                    <div key={category}>
                      <h4 className="text-foreground mb-4">{category}</h4>
                      <div className="space-y-4">
                        {categorySkills.map((skill) => (
                          <div key={skill.id}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-foreground">
                                {skill.skill}
                              </span>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => handleEditSkill(skill)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 text-destructive"
                                  onClick={() =>
                                    skillDeleteMutation.mutate(skill.id)
                                  }
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Certifications & Awards</CardTitle>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => {
                  setEditingCert(null);
                  resetCertForm();
                  setCertDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Add Certification
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {certsLoading ? (
                <div>Loading...</div>
              ) : certifications.length === 0 ? (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground mb-2">
                    No certifications added yet
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Add your professional certifications
                  </p>
                </div>
              ) : (
                certifications.map((cert) => (
                  <div key={cert.id} className="border-b border-border pb-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <div>
                            <h4 className="text-foreground">{cert.name}</h4>
                            <p className="text-muted-foreground">
                              {cert.issuer}
                            </p>
                          </div>
                          <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                            Verified
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Issued: {cert.date}
                          </span>
                        </div>
                        {cert.credentialId && (
                          <p className="text-xs text-muted-foreground mb-3">
                            Credential ID: {cert.credentialId}
                          </p>
                        )}
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleEditCertification(cert)}
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 text-destructive"
                            onClick={() => certDeleteMutation.mutate(cert.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Experience Dialog */}
      <ExperienceDialog
        open={expDialogOpen}
        onOpenChange={setExpDialogOpen}
        editingExp={editingExp}
        expControl={expControl}
        handleExpSubmit={handleExpSubmit}
        expMutation={expMutation}
      />

      {/* Education Dialog */}
      <EducationDialog
        open={eduDialogOpen}
        onOpenChange={setEduDialogOpen}
        editingEdu={editingEdu}
        eduControl={eduControl}
        handleEduSubmit={handleEduSubmit}
        eduMutation={eduMutation}
      />

      {/* Skill Dialog */}
      <SkillDialog
        open={skillDialogOpen}
        onOpenChange={setSkillDialogOpen}
        editingSkill={editingSkill}
        skillControl={skillControl}
        handleSkillSubmit={handleSkillSubmit}
        skillMutation={skillMutation}
      />

      {/* Certification Dialog */}
      <CertificationDialog
        open={certDialogOpen}
        onOpenChange={setCertDialogOpen}
        editingCert={editingCert}
        certControl={certControl}
        handleCertSubmit={handleCertSubmit}
        certMutation={certMutation}
      />
    </div>
  );
};

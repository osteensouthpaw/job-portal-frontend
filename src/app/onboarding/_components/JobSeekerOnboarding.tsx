import { useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Plus,
  X,
  Sparkles,
  Badge,
} from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Logo from "./Logo";

export interface OnboardingData {
  // Personal Info
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;

  // Job Preferences
  desiredRole: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: string;
  salaryMax: string;

  // Experience
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;

  // Education
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;

  // Skills
  skills: Array<{
    id: string;
    name: string;
    level: number;
    category: string;
  }>;

  // Certifications
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }>;
}

interface OnboardingPageProps {
  onComplete: (data: OnboardingData) => void;
}

export function JobSeekerOnboarding({ onComplete }: OnboardingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    title: "",
    bio: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    desiredRole: "",
    jobType: "Full-time",
    experienceLevel: "Mid-Level",
    salaryMin: "",
    salaryMax: "",
    experience: [],
    education: [],
    skills: [],
    certifications: [],
  });

  // Temporary form states for adding items
  const [tempExp, setTempExp] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const [tempEdu, setTempEdu] = useState({
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    gpa: "",
  });

  const [tempSkill, setTempSkill] = useState({
    name: "",
    level: 50,
    category: "Design",
  });

  const [tempCert, setTempCert] = useState({
    name: "",
    issuer: "",
    date: "",
    credentialId: "",
  });

  const steps = [
    {
      id: "personal",
      title: "Personal Information",
      description: "Let's start with the basics",
      icon: User,
    },
    {
      id: "experience",
      title: "Work Experience",
      description: "Tell us about your career journey",
      icon: Briefcase,
    },
    {
      id: "education",
      title: "Education",
      description: "Your educational background",
      icon: GraduationCap,
    },
    {
      id: "skills",
      title: "Skills",
      description: "What are you good at?",
      icon: Award,
    },
    {
      id: "certifications",
      title: "Certifications",
      description: "Your professional certifications",
      icon: CheckCircle2,
    },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    // Validate current step
    if (currentStep === 0) {
      if (!data.name || !data.title || !data.email) {
        toast.error("Please fill in all required fields");
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    toast.success("Profile setup complete! 🎉");
    onComplete(data);
    console.log({ data });
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  // Add experience
  const addExperience = () => {
    if (!tempExp.title || !tempExp.company) {
      toast.error("Please fill in job title and company");
      return;
    }

    const newExp = {
      id: Date.now().toString(),
      ...tempExp,
    };

    setData({
      ...data,
      experience: [...data.experience, newExp],
    });

    setTempExp({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });

    toast.success("Experience added!");
  };

  // Add education
  const addEducation = () => {
    if (!tempEdu.degree || !tempEdu.institution) {
      toast.error("Please fill in degree and institution");
      return;
    }

    const newEdu = {
      id: Date.now().toString(),
      ...tempEdu,
    };

    setData({
      ...data,
      education: [...data.education, newEdu],
    });

    setTempEdu({
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
    });

    toast.success("Education added!");
  };

  // Add skill
  const addSkill = () => {
    if (!tempSkill.name) {
      toast.error("Please enter a skill name");
      return;
    }

    const newSkill = {
      id: Date.now().toString(),
      ...tempSkill,
    };

    setData({
      ...data,
      skills: [...data.skills, newSkill],
    });

    setTempSkill({
      name: "",
      level: 50,
      category: "Design",
    });

    toast.success("Skill added!");
  };

  // Add certification
  const addCertification = () => {
    if (!tempCert.name || !tempCert.issuer) {
      toast.error("Please fill in certification name and issuer");
      return;
    }

    const newCert = {
      id: Date.now().toString(),
      ...tempCert,
    };

    setData({
      ...data,
      certifications: [...data.certifications, newCert],
    });

    setTempCert({
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
    });

    toast.success("Certification added!");
  };

  // Remove functions
  const removeExperience = (id: string) => {
    setData({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const removeEducation = (id: string) => {
    setData({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const removeSkill = (id: string) => {
    setData({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id),
    });
  };

  const removeCertification = (id: string) => {
    setData({
      ...data,
      certifications: data.certifications.filter((cert) => cert.id !== id),
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Information
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 mb-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-2xl">
                  {data.name
                    ? data.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <p className="text-muted-foreground text-sm text-center">
                You can upload a photo later
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="title">Professional Title *</Label>
                <Input
                  id="title"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  placeholder="Product Designer"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Professional Summary</Label>
              <Textarea
                id="bio"
                value={data.bio}
                onChange={(e) => setData({ ...data, bio: e.target.value })}
                placeholder="Brief description of your professional background..."
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="john@example.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">
                <MapPin className="h-4 w-4 inline mr-1" />
                Location
              </Label>
              <Input
                id="location"
                value={data.location}
                onChange={(e) => setData({ ...data, location: e.target.value })}
                placeholder="San Francisco, CA"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="website">
                  <Globe className="h-4 w-4 inline mr-1" />
                  Website
                </Label>
                <Input
                  id="website"
                  value={data.website}
                  onChange={(e) =>
                    setData({ ...data, website: e.target.value })
                  }
                  placeholder="yoursite.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">
                  <Linkedin className="h-4 w-4 inline mr-1" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={data.linkedin}
                  onChange={(e) =>
                    setData({ ...data, linkedin: e.target.value })
                  }
                  placeholder="linkedin.com/in/johndoe"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="github">
                  <Github className="h-4 w-4 inline mr-1" />
                  GitHub
                </Label>
                <Input
                  id="github"
                  value={data.github}
                  onChange={(e) => setData({ ...data, github: e.target.value })}
                  placeholder="github.com/johndoe"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-foreground mb-4">Job Preferences</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="desired-role">Desired Role</Label>
                    <Input
                      id="desired-role"
                      value={data.desiredRole}
                      onChange={(e) =>
                        setData({ ...data, desiredRole: e.target.value })
                      }
                      placeholder="Senior Product Designer"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="job-type">Job Type</Label>
                    <Select
                      value={data.jobType}
                      onValueChange={(value) =>
                        setData({ ...data, jobType: value })
                      }
                    >
                      <SelectTrigger id="job-type" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience-level">Experience Level</Label>
                  <Select
                    value={data.experienceLevel}
                    onValueChange={(value) =>
                      setData({ ...data, experienceLevel: value })
                    }
                  >
                    <SelectTrigger id="experience-level" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry Level">Entry Level</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Lead">Lead</SelectItem>
                      <SelectItem value="Principal">Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salary-min">Desired Salary (Min)</Label>
                    <Input
                      id="salary-min"
                      value={data.salaryMin}
                      onChange={(e) =>
                        setData({ ...data, salaryMin: e.target.value })
                      }
                      placeholder="$80,000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salary-max">Desired Salary (Max)</Label>
                    <Input
                      id="salary-max"
                      value={data.salaryMax}
                      onChange={(e) =>
                        setData({ ...data, salaryMax: e.target.value })
                      }
                      placeholder="$120,000"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Work Experience
        return (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <p className="text-green-900 dark:text-green-300 text-sm mb-1">
                    Add your work experience to stand out
                  </p>
                  <p className="text-green-700 dark:text-green-400 text-xs">
                    You can add multiple positions. This helps employers
                    understand your background.
                  </p>
                </div>
              </div>
            </div>

            {/* Added Experience List */}
            {data.experience.length > 0 && (
              <div className="space-y-3">
                <Label>Added Experience ({data.experience.length})</Label>
                {data.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="text-foreground">{exp.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {exp.company}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Experience Form */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="text-foreground">Add Work Experience</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exp-title">Job Title *</Label>
                  <Input
                    id="exp-title"
                    value={tempExp.title}
                    onChange={(e) =>
                      setTempExp({ ...tempExp, title: e.target.value })
                    }
                    placeholder="Product Designer"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="exp-company">Company *</Label>
                  <Input
                    id="exp-company"
                    value={tempExp.company}
                    onChange={(e) =>
                      setTempExp({ ...tempExp, company: e.target.value })
                    }
                    placeholder="TechCorp Inc."
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="exp-location">Location</Label>
                <Input
                  id="exp-location"
                  value={tempExp.location}
                  onChange={(e) =>
                    setTempExp({ ...tempExp, location: e.target.value })
                  }
                  placeholder="San Francisco, CA"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exp-start">Start Date</Label>
                  <Input
                    id="exp-start"
                    type="month"
                    value={tempExp.startDate}
                    onChange={(e) =>
                      setTempExp({ ...tempExp, startDate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="exp-end">End Date</Label>
                  <Input
                    id="exp-end"
                    type="month"
                    value={tempExp.endDate}
                    onChange={(e) =>
                      setTempExp({ ...tempExp, endDate: e.target.value })
                    }
                    disabled={tempExp.current}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="exp-current"
                  checked={tempExp.current}
                  onCheckedChange={(checked) =>
                    setTempExp({
                      ...tempExp,
                      current: checked,
                      endDate: checked ? "" : tempExp.endDate,
                    })
                  }
                />
                <Label htmlFor="exp-current">I currently work here</Label>
              </div>

              <div>
                <Label htmlFor="exp-description">Description</Label>
                <Textarea
                  id="exp-description"
                  value={tempExp.description}
                  onChange={(e) =>
                    setTempExp({ ...tempExp, description: e.target.value })
                  }
                  placeholder="Describe your responsibilities and achievements..."
                  className="mt-1 min-h-[80px]"
                />
              </div>

              <Button
                onClick={addExperience}
                variant="outline"
                className="w-full gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Experience
              </Button>
            </div>
          </div>
        );

      case 2: // Education
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="text-blue-900 dark:text-blue-300 text-sm mb-1">
                    Add your educational background
                  </p>
                  <p className="text-blue-700 dark:text-blue-400 text-xs">
                    Include degrees, certifications, and relevant courses.
                  </p>
                </div>
              </div>
            </div>

            {/* Added Education List */}
            {data.education.length > 0 && (
              <div className="space-y-3">
                <Label>Added Education ({data.education.length})</Label>
                {data.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="text-foreground">{edu.degree}</h4>
                      <p className="text-muted-foreground text-sm">
                        {edu.institution}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Education Form */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="text-foreground">Add Education</h4>

              <div>
                <Label htmlFor="edu-degree">Degree *</Label>
                <Input
                  id="edu-degree"
                  value={tempEdu.degree}
                  onChange={(e) =>
                    setTempEdu({ ...tempEdu, degree: e.target.value })
                  }
                  placeholder="Bachelor of Science in Design"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="edu-institution">Institution *</Label>
                <Input
                  id="edu-institution"
                  value={tempEdu.institution}
                  onChange={(e) =>
                    setTempEdu({ ...tempEdu, institution: e.target.value })
                  }
                  placeholder="University of California"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="edu-location">Location</Label>
                <Input
                  id="edu-location"
                  value={tempEdu.location}
                  onChange={(e) =>
                    setTempEdu({ ...tempEdu, location: e.target.value })
                  }
                  placeholder="Berkeley, CA"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edu-start">Start Date</Label>
                  <Input
                    id="edu-start"
                    type="month"
                    value={tempEdu.startDate}
                    onChange={(e) =>
                      setTempEdu({ ...tempEdu, startDate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edu-end">End Date</Label>
                  <Input
                    id="edu-end"
                    type="month"
                    value={tempEdu.endDate}
                    onChange={(e) =>
                      setTempEdu({ ...tempEdu, endDate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edu-gpa">GPA (Optional)</Label>
                <Input
                  id="edu-gpa"
                  value={tempEdu.gpa}
                  onChange={(e) =>
                    setTempEdu({ ...tempEdu, gpa: e.target.value })
                  }
                  placeholder="3.8"
                  className="mt-1"
                />
              </div>

              <Button
                onClick={addEducation}
                variant="outline"
                className="w-full gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Education
              </Button>
            </div>
          </div>
        );

      case 3: // Skills
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div>
                  <p className="text-purple-900 dark:text-purple-300 text-sm mb-1">
                    Showcase your skills and expertise
                  </p>
                  <p className="text-purple-700 dark:text-purple-400 text-xs">
                    Add the skills that make you stand out to employers.
                  </p>
                </div>
              </div>
            </div>

            {/* Added Skills List */}
            {data.skills.length > 0 && (
              <div className="space-y-3">
                <Label>Added Skills ({data.skills.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 pr-1"
                    >
                      {skill.name} ({skill.level}%)
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="ml-2 hover:text-green-700 dark:hover:text-green-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Skill Form */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="text-foreground">Add Skill</h4>

              <div>
                <Label htmlFor="skill-name">Skill Name *</Label>
                <Input
                  id="skill-name"
                  value={tempSkill.name}
                  onChange={(e) =>
                    setTempSkill({ ...tempSkill, name: e.target.value })
                  }
                  placeholder="UI/UX Design"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="skill-category">Category</Label>
                <Select
                  value={tempSkill.category}
                  onValueChange={(value) =>
                    setTempSkill({ ...tempSkill, category: value })
                  }
                >
                  <SelectTrigger id="skill-category" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="skill-level">
                  Proficiency Level: {tempSkill.level}%
                </Label>
                <input
                  id="skill-level"
                  type="range"
                  min="0"
                  max="100"
                  value={tempSkill.level}
                  onChange={(e) =>
                    setTempSkill({
                      ...tempSkill,
                      level: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer mt-2"
                />
              </div>

              <Button
                onClick={addSkill}
                variant="outline"
                className="w-full gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Skill
              </Button>
            </div>
          </div>
        );

      case 4: // Certifications
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <p className="text-amber-900 dark:text-amber-300 text-sm mb-1">
                    Add your certifications (Optional)
                  </p>
                  <p className="text-amber-700 dark:text-amber-400 text-xs">
                    Professional certifications help validate your expertise.
                  </p>
                </div>
              </div>
            </div>

            {/* Added Certifications List */}
            {data.certifications.length > 0 && (
              <div className="space-y-3">
                <Label>
                  Added Certifications ({data.certifications.length})
                </Label>
                {data.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="text-foreground">{cert.name}</h4>
                      <p className="text-muted-foreground text-sm">
                        {cert.issuer}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(cert.id)}
                      className="text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Certification Form */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="text-foreground">Add Certification</h4>

              <div>
                <Label htmlFor="cert-name">Certification Name *</Label>
                <Input
                  id="cert-name"
                  value={tempCert.name}
                  onChange={(e) =>
                    setTempCert({ ...tempCert, name: e.target.value })
                  }
                  placeholder="Google UX Design Professional Certificate"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cert-issuer">Issuing Organization *</Label>
                <Input
                  id="cert-issuer"
                  value={tempCert.issuer}
                  onChange={(e) =>
                    setTempCert({ ...tempCert, issuer: e.target.value })
                  }
                  placeholder="Google"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cert-date">Issue Date</Label>
                <Input
                  id="cert-date"
                  type="month"
                  value={tempCert.date}
                  onChange={(e) =>
                    setTempCert({ ...tempCert, date: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cert-id">Credential ID (Optional)</Label>
                <Input
                  id="cert-id"
                  value={tempCert.credentialId}
                  onChange={(e) =>
                    setTempCert({ ...tempCert, credentialId: e.target.value })
                  }
                  placeholder="ABC123XYZ"
                  className="mt-1"
                />
              </div>

              <Button
                onClick={addCertification}
                variant="outline"
                className="w-full gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Certification
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentStepInfo = steps[currentStep];
  const StepIcon = currentStepInfo.icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo />
          <p className="text-muted-foreground">
            Let's set up your profile to help you find the perfect job
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-green-600 dark:text-green-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-8 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={step.id}
                className={`flex flex-col items-center gap-2 min-w-[80px] ${
                  isActive ? "opacity-100" : "opacity-50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted
                      ? "bg-green-600 dark:bg-green-500"
                      : isActive
                      ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-600 dark:border-green-400"
                      : "bg-muted"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  ) : (
                    <Icon
                      className={`h-6 w-6 ${
                        isActive
                          ? "text-green-600 dark:text-green-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  )}
                </div>
                <span className="text-xs text-center hidden sm:block">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <StepIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle>{currentStepInfo.title}</CardTitle>
                <CardDescription>{currentStepInfo.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>

              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button variant="ghost" onClick={handleSkip}>
                    Skip
                  </Button>
                )}
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white gap-2"
                  onClick={handleNext}
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      Complete
                      <CheckCircle2 className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

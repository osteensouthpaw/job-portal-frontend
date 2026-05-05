"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Bell,
  Briefcase,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  EyeOff,
  Globe,
  Key,
  Languages,
  Lock,
  Mail,
  Moon,
  Palette,
  Save,
  Settings as SettingsIcon,
  Shield,
  Smartphone,
  Sun,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface AccountSettingsFormData {
  email: string;
  username: string;
  phoneNumber: string;
  language: string;
  timezone: string;
  dateFormat: string;
}

interface NotificationSettingsFormData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  jobAlerts: boolean;
  applicationUpdates: boolean;
  messageNotifications: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
  jobRecommendations: boolean;
  profileViews: boolean;
  newMessages: boolean;
  interviewReminders: boolean;
}

interface PrivacySettingsFormData {
  profileVisibility: string;
  showEmail: boolean;
  showPhone: boolean;
  showResume: boolean;
  allowRecruiterMessages: boolean;
  showOnlineStatus: boolean;
  searchableProfile: boolean;
  showApplicationHistory: boolean;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AppearanceSettingsFormData {
  theme: string;
  compactMode: boolean;
  fontSize: string;
  colorScheme: string;
}

export default function SettingsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Account Settings Form
  const accountForm = useForm<AccountSettingsFormData>({
    defaultValues: {
      email: "john.doe@example.com",
      username: "johndoe",
      phoneNumber: "+1 (555) 123-4567",
      language: "en",
      timezone: "America/Los_Angeles",
      dateFormat: "MM/DD/YYYY",
    },
    mode: "onChange",
  });

  // Notification Settings Form
  const notificationForm = useForm<NotificationSettingsFormData>({
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      jobAlerts: true,
      applicationUpdates: true,
      messageNotifications: true,
      weeklyDigest: true,
      marketingEmails: false,
      jobRecommendations: true,
      profileViews: true,
      newMessages: true,
      interviewReminders: true,
    },
  });

  // Privacy Settings Form
  const privacyForm = useForm<PrivacySettingsFormData>({
    defaultValues: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
      showResume: true,
      allowRecruiterMessages: true,
      showOnlineStatus: true,
      searchableProfile: true,
      showApplicationHistory: false,
    },
  });

  // Password Form
  const passwordForm = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Appearance Settings Form
  const appearanceForm = useForm<AppearanceSettingsFormData>({
    defaultValues: {
      theme: "system",
      compactMode: false,
      fontSize: "medium",
      colorScheme: "green",
    },
  });

  const handleSaveAccountSettings = accountForm.handleSubmit((data) => {
    console.log("Account settings:", data);
    toast.success("Account settings updated successfully!");
  });

  const handleSaveNotificationSettings = notificationForm.handleSubmit(
    (data) => {
      console.log("Notification settings:", data);
      toast.success("Notification preferences updated!");
    }
  );

  const handleSavePrivacySettings = privacyForm.handleSubmit((data) => {
    console.log("Privacy settings:", data);
    toast.success("Privacy settings updated!");
  });

  const handleChangePassword = passwordForm.handleSubmit((data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (data.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }
    console.log("Password change:", data);
    toast.success("Password changed successfully!");
    setPasswordDialogOpen(false);
    passwordForm.reset();
  });

  const handleSaveAppearanceSettings = appearanceForm.handleSubmit((data) => {
    console.log("Appearance settings:", data);
    toast.success("Appearance settings updated!");
  });

  const handleExportData = () => {
    toast.success(
      "Your data export has been initiated. You will receive an email shortly."
    );
  };

  const handleDeleteAccount = () => {
    toast.success(
      "Account deletion request submitted. You will receive a confirmation email."
    );
    setDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                Account Information
              </CardTitle>
              <CardDescription>
                Update your account details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAccountSettings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...accountForm.register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="mt-1"
                    />
                    {accountForm.formState.errors.email && (
                      <p className="text-destructive text-xs mt-1">
                        {accountForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="username">
                      <User className="h-4 w-4 inline mr-1" />
                      Username *
                    </Label>
                    <Input
                      id="username"
                      {...accountForm.register("username", {
                        required: "Username is required",
                      })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phoneNumber">
                    <Smartphone className="h-4 w-4 inline mr-1" />
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    {...accountForm.register("phoneNumber")}
                    placeholder="+1 (555) 123-4567"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="language">
                      <Languages className="h-4 w-4 inline mr-1" />
                      Language
                    </Label>
                    <Controller
                      name="language"
                      control={accountForm.control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="language" className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Timezone
                    </Label>
                    <Controller
                      name="timezone"
                      control={accountForm.control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="timezone" className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/Los_Angeles">
                              Pacific Time
                            </SelectItem>
                            <SelectItem value="America/Denver">
                              Mountain Time
                            </SelectItem>
                            <SelectItem value="America/Chicago">
                              Central Time
                            </SelectItem>
                            <SelectItem value="America/New_York">
                              Eastern Time
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              London
                            </SelectItem>
                            <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Controller
                      name="dateFormat"
                      control={accountForm.control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="dateFormat" className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">
                              MM/DD/YYYY
                            </SelectItem>
                            <SelectItem value="DD/MM/YYYY">
                              DD/MM/YYYY
                            </SelectItem>
                            <SelectItem value="YYYY-MM-DD">
                              YYYY-MM-DD
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSaveNotificationSettings}
                className="space-y-6"
              >
                {/* Notification Channels */}
                <div className="space-y-4">
                  <h4 className="text-foreground">Notification Channels</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-foreground">
                            Email Notifications
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                      </div>
                      <Controller
                        name="emailNotifications"
                        control={notificationForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-foreground">
                            Push Notifications
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Receive push notifications in browser
                          </p>
                        </div>
                      </div>
                      <Controller
                        name="pushNotifications"
                        control={notificationForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-foreground">
                            SMS Notifications
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Receive important updates via SMS
                          </p>
                        </div>
                      </div>
                      <Controller
                        name="smsNotifications"
                        control={notificationForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Job Related */}
                <div className="space-y-4">
                  <h4 className="text-foreground">Job Related</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">Job Alerts</p>
                        <p className="text-xs text-muted-foreground">
                          New jobs matching your preferences
                        </p>
                      </div>
                      <Controller
                        name="jobAlerts"
                        control={notificationForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">
                          Application Updates
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Status changes on your applications
                        </p>
                      </div>
                      <Controller
                        name="applicationUpdates"
                        control={notificationForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">
                          Job Recommendations
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Personalized job suggestions
                        </p>
                      </div>
                      <Controller
                        name="jobRecommendations"
                        control={notificationForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">
                          Interview Reminders
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Reminders for scheduled interviews
                        </p>
                      </div>
                      <Controller
                        name="interviewReminders"
                        control={notificationForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Activity */}
                <div className="space-y-4">
                  <h4 className="text-foreground">Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">
                          Message Notifications
                        </p>
                        <p className="text-xs text-muted-foreground">
                          New messages from recruiters
                        </p>
                      </div>
                      <Controller
                        name="messageNotifications"
                        control={notificationForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">Profile Views</p>
                        <p className="text-xs text-muted-foreground">
                          When recruiters view your profile
                        </p>
                      </div>
                      <Controller
                        name="profileViews"
                        control={notificationForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">Weekly Digest</p>
                        <p className="text-xs text-muted-foreground">
                          Summary of your weekly activity
                        </p>
                      </div>
                      <Controller
                        name="weeklyDigest"
                        control={notificationForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">
                          Marketing Emails
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tips, news, and promotional content
                        </p>
                      </div>
                      <Controller
                        name="marketingEmails"
                        control={notificationForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                Privacy Settings
              </CardTitle>
              <CardDescription>
                Control who can see your information and how it's used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSavePrivacySettings} className="space-y-6">
                {/* Profile Visibility */}
                <div className="space-y-4">
                  <h4 className="text-foreground">Profile Visibility</h4>
                  <div>
                    <Label htmlFor="profileVisibility">
                      Who can see your profile?
                    </Label>
                    <Controller
                      name="profileVisibility"
                      control={privacyForm.control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="profileVisibility"
                            className="mt-1"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                Public - Anyone can view
                              </div>
                            </SelectItem>
                            <SelectItem value="recruiters">
                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                Recruiters only
                              </div>
                            </SelectItem>
                            <SelectItem value="private">
                              <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Private - Hidden from search
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-foreground">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">
                          Show Email Address
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Display your email on public profile
                        </p>
                      </div>
                      <Controller
                        name="showEmail"
                        control={privacyForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">
                          Show Phone Number
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Display your phone on public profile
                        </p>
                      </div>
                      <Controller
                        name="showPhone"
                        control={privacyForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Features */}
                <div className="space-y-4">
                  <h4 className="text-foreground">Profile Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">Show Resume</p>
                        <p className="text-xs text-muted-foreground">
                          Allow recruiters to view your resume
                        </p>
                      </div>
                      <Controller
                        name="showResume"
                        control={privacyForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">
                          Searchable Profile
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Allow your profile to appear in search results
                        </p>
                      </div>
                      <Controller
                        name="searchableProfile"
                        control={privacyForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">
                          Show Online Status
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Let others see when you're online
                        </p>
                      </div>
                      <Controller
                        name="showOnlineStatus"
                        control={privacyForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">
                          Show Application History
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Display your past applications to recruiters
                        </p>
                      </div>
                      <Controller
                        name="showApplicationHistory"
                        control={privacyForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Communication */}
                <div className="space-y-4">
                  <h4 className="text-foreground">Communication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm text-foreground">
                          Allow Recruiter Messages
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Let recruiters send you direct messages
                        </p>
                      </div>
                      <Controller
                        name="allowRecruiterMessages"
                        control={privacyForm.control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your password and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password */}
              <div className="space-y-4">
                <h4 className="text-foreground">Password</h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-sm text-foreground mb-1">Password</p>
                    <p className="text-xs text-muted-foreground">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setPasswordDialogOpen(true)}
                    className="gap-2"
                  >
                    <Key className="h-4 w-4" />
                    Change Password
                  </Button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="space-y-4">
                <h4 className="text-foreground">Two-Factor Authentication</h4>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-foreground mb-1">
                        Two-Factor Authentication (2FA)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      Not Enabled
                    </Badge>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Enable 2FA
                  </Button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="space-y-4">
                <h4 className="text-foreground">Active Sessions</h4>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground">
                            Current Session
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Chrome on MacOS • San Francisco, CA
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Active now
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground">
                            Mobile Device
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Safari on iPhone • San Francisco, CA
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last active 2 hours ago
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Data */}
              <div className="space-y-4">
                <h4 className="text-foreground">Account Data</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground mb-1">
                        Export Your Data
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Download a copy of your account data
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleExportData}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                    <div>
                      <p className="text-sm text-foreground mb-1">
                        Delete Account
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setDeleteDialogOpen(true)}
                      className="gap-2 text-destructive border-destructive hover:bg-destructive hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Palette className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize how the application looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSaveAppearanceSettings}
                className="space-y-6"
              >
                {/* Theme */}
                <div className="space-y-4">
                  <h4 className="text-foreground">Theme</h4>
                  <div>
                    <Label htmlFor="theme">Color Theme</Label>
                    <Controller
                      name="theme"
                      control={appearanceForm.control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="theme" className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">
                              <div className="flex items-center gap-2">
                                <Sun className="h-4 w-4" />
                                Light
                              </div>
                            </SelectItem>
                            <SelectItem value="dark">
                              <div className="flex items-center gap-2">
                                <Moon className="h-4 w-4" />
                                Dark
                              </div>
                            </SelectItem>
                            <SelectItem value="system">
                              <div className="flex items-center gap-2">
                                <SettingsIcon className="h-4 w-4" />
                                System
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div>
                    <Label htmlFor="colorScheme">Accent Color</Label>
                    <Controller
                      name="colorScheme"
                      control={appearanceForm.control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="colorScheme" className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="green">
                              Green (Default)
                            </SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="purple">Purple</SelectItem>
                            <SelectItem value="orange">Orange</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                {/* Display */}
                <div className="space-y-4">
                  <h4 className="text-foreground">Display</h4>
                  <div>
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Controller
                      name="fontSize"
                      control={appearanceForm.control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="fontSize" className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">
                              Medium (Default)
                            </SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Compact Mode</p>
                      <p className="text-xs text-muted-foreground">
                        Reduce spacing and padding throughout the app
                      </p>
                    </div>
                    <Controller
                      name="compactMode"
                      control={appearanceForm.control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Appearance
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new password
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative mt-1">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  {...passwordForm.register("currentPassword", {
                    required: "Current password is required",
                  })}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-destructive text-xs mt-1">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative mt-1">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  {...passwordForm.register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordForm.formState.errors.newPassword && (
                <p className="text-destructive text-xs mt-1">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...passwordForm.register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-destructive text-xs mt-1">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-blue-900 dark:text-blue-300 text-xs">
                Password must be at least 8 characters long and include a mix of
                letters, numbers, and symbols.
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setPasswordDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Change Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm text-destructive mb-2">Warning:</p>
              <ul className="text-xs text-destructive space-y-1 list-disc list-inside">
                <li>All your job applications will be withdrawn</li>
                <li>Your profile and resume will be permanently deleted</li>
                <li>You will lose access to all saved jobs and activity</li>
                <li>This action is irreversible</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              If you're sure you want to proceed, click the button below to
              submit your account deletion request.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              className="bg-destructive hover:bg-destructive/90 text-white gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete My Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

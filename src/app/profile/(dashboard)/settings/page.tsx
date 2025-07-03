import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DangerZone from "./DangerZone";
import LinkedAccounts from "./LinkedAccounts";
import UpdateNameForm from "./UpdateNameForm";
import ChangePasswordForm from "./UpdatePasswordForm";

const UserSettingsPage = () => {
  return (
    <div className="mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Account Settings</CardTitle>
          <CardDescription>
            Manage your personal information, password, and linked accounts.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <section className="bg-muted/50 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Update Name</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              Change your display name as it appears on your profile.
            </p>
            <UpdateNameForm />
          </section>
          <Separator />
          <section className="bg-muted/50 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Change Password</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              Update your password to keep your account secure.
            </p>
            <ChangePasswordForm />
          </section>
          <Separator />
          <section className="bg-muted/50 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Linked Accounts</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              Connect or disconnect your social and professional accounts.
            </p>
            <LinkedAccounts />
          </section>
        </CardContent>
        <CardFooter>
          <section className="rounded-lg p-6 border border-destructive bg-destructive/10 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-destructive">
              Danger Zone
            </h2>
            <p className="text-destructive mb-4 text-sm">
              Deleting your account is irreversible. All your data will be
              permanently removed.
            </p>
            <DangerZone />
          </section>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserSettingsPage;

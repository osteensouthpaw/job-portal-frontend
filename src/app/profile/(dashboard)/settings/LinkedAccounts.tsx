"use client";
import { useAuth } from "@/app/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import {
  getUserConnectedAccounts,
  UserConnectedAccount,
} from "@/services/user-service";
import { Github, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const providerMeta: Record<
  string,
  { label: string; icon: React.ReactNode; color: string }
> = {
  github: {
    label: "GitHub",
    icon: <Github className="w-5 h-5 text-gray-800" />,
    color: "bg-gray-100",
  },
  google: {
    label: "Google",
    icon: <Mail className="w-5 h-5 text-blue-500" />,
    color: "bg-blue-50",
  },
};

const LinkedAccounts = () => {
  const [accounts, setAccounts] = useState<UserConnectedAccount[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getUserConnectedAccounts()
      .then((res) => setAccounts(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <Card className="shadow-none border-none bg-transparent">
      <CardContent className="p-0 space-y-4">
        {accounts.length === 0 ? (
          <div className="text-muted-foreground text-sm text-center py-6">
            No social accounts connected.
          </div>
        ) : (
          accounts.map((account) => {
            const provider = providerMeta[account.providerName.toLowerCase()];
            return (
              <div
                key={account.id}
                className={`flex items-center justify-between border p-4 rounded-md ${
                  provider.color ?? ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {provider.icon}
                  <span className="font-medium">
                    {provider.label ?? account.providerName}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Connected on{" "}
                  {new Date(account.connectedDate).toLocaleDateString()}
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default LinkedAccounts;

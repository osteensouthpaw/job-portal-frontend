"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { useState } from "react";

const LinkedAccounts = () => {
  const [linked, setLinked] = useState({
    google: true,
    github: true,
  });

  return (
    <Card className="shadow-none border-none bg-transparent">
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center justify-between border p-4 rounded-md">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-500" />
            <span>Google</span>
          </div>
          {linked.google ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setLinked((l) => ({ ...l, google: false }))}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLinked((l) => ({ ...l, google: true }))}
            >
              Connect
            </Button>
          )}
        </div>
        <div className="flex items-center justify-between border p-4 rounded-md">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-gray-800" />
            <span>GitHub</span>
          </div>
          {linked.github ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setLinked((l) => ({ ...l, github: false }))}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLinked((l) => ({ ...l, github: true }))}
            >
              Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkedAccounts;

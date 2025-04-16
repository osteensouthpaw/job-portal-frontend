import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, DownloadCloud, Edit, Share } from "lucide-react";
import Link from "next/link";

const ProfileHeader = () => {
  return (
    <div className="flex flex-col md:flex-row relative gap-6">
      <Badge
        variant="secondary"
        className="size-36 rounded-full grid place-content-center"
      >
        <p>OO</p>
      </Badge>
      <div className="space-y-5 flex-grow">
        <div>
          <h2 className="text-3xl font-semibold">Osteen Omega</h2>
          <p className="text-muted-foreground">osteen@gmail.com</p>
        </div>
        <div className="space-y-1">
          <div className="flex gap-2">
            <Building2 size={22} />
            <p>Spring Enterprise</p>
          </div>
          <div className="flex gap-2">
            <DownloadCloud size={22} />
            <Link href="#">
              <p>Resume</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-col">
        <Button
          variant="outline"
          className="absolute md:static top-0 right-0 self-end"
        >
          <Share size={22} />
        </Button>
        <Button className="w-full">
          Edit Profile <Edit />
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;

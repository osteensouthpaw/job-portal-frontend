import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

const UserBio = ({
  about,
  isProfileOwner,
}: {
  about: string;
  isProfileOwner: boolean;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">About</h3>
        {isProfileOwner && (
          <Button variant="ghost" className="rounded-full">
            <Edit2 />
          </Button>
        )}
      </div>

      <p className="">{about}</p>
    </div>
  );
};

export default UserBio;

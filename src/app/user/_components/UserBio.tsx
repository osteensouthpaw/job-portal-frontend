import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

const UserBio = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">About</h3>
        <Button variant="ghost" className="rounded-full">
          <Edit2 />
        </Button>
      </div>

      <p className="">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
        laborum a praesentium officiis quaerat exercitationem hic optio aliquam,
        nesciunt tempora, sit amet. Doloremque consectetur tempora molestias
        reprehenderit aut alias doloribus?
      </p>
    </div>
  );
};

export default UserBio;

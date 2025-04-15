import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const SocialLinks = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Social Links</h3>
      <ul className="flex gap-4 flex-wrap">
        <li>
          <Link href="#">
            <Button variant="outline" className="rounded-full size-12">
              <Github />
            </Button>
          </Link>
        </li>
        <li>
          <Link href="#">
            <Button variant="outline" className="rounded-full size-12">
              <Twitter />
            </Button>
          </Link>
        </li>
        <li>
          <Link href="#">
            <Button variant="outline" className="rounded-full size-12">
              <Linkedin />
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;

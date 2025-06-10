import { Button } from "@/components/ui/button";
import { Github, Link2, Linkedin, Plus, Twitter } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  linkedin?: string;
  github?: string;
  twitter?: string;
  personalWebsite?: string;
}

const SocialLinks = ({ linkedin, github, twitter, personalWebsite }: Props) => {
  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Social Links</h3>
          <Button variant="ghost" className="rounded-full">
            <Plus />
          </Button>
        </div>
        <ul className="flex gap-4 flex-wrap">
          {github && (
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={github} target="_blank">
                    <Button variant="outline" className="rounded-full size-12">
                      <Github />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View GitHub profile</TooltipContent>
              </Tooltip>
            </li>
          )}
          {twitter && (
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={twitter} target="_blank">
                    <Button variant="outline" className="rounded-full size-12">
                      <Twitter />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View Twitter profile</TooltipContent>
              </Tooltip>
            </li>
          )}
          {linkedin && (
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={linkedin} target="_blank">
                    <Button variant="outline" className="rounded-full size-12">
                      <Linkedin />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>View LinkedIn profile</TooltipContent>
              </Tooltip>
            </li>
          )}
          {personalWebsite && (
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={personalWebsite} target="_blank">
                    <Button variant="outline" className="rounded-full size-12">
                      <Link2 />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Visit personal website</TooltipContent>
              </Tooltip>
            </li>
          )}
        </ul>
      </div>
    </TooltipProvider>
  );
};

export default SocialLinks;

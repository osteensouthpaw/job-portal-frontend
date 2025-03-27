import { Card } from "@/components/ui/card";
import { Calendar, Share, House, Clock } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DefinitionItem from "./DefinitionItem";

const UserReactionCard = () => {
  return (
    <Card className="shadow-none p-3 border-0 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center lg:flex-col lg:justify-normal lg:items-stretch">
        <div className="flex justify-between md:gap-6">
          <div className="flex flex-col">
            <p className="text-base font-semibold">Osteen Omega</p>
            <small>osteenomega2@gmail.com</small>
          </div>
          <Badge>Eligible</Badge>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <Button variant="ghost">
              <Calendar />
            </Button>
            <Button variant="ghost">
              <Calendar />
            </Button>
          </div>
          <Button variant="outline">
            <Share />
          </Button>
        </div>
        <Button className="w-full md:w-max ml-auto lg:w-full">Apply</Button>
      </div>
      <hr />
      <div className="flex flex-col gap-4 md:flex-row md:justify-between lg:flex-col lg:justify-normal flex-wrap">
        <DefinitionItem term="Applied" description="100">
          <House />
        </DefinitionItem>
        <DefinitionItem term="Impressions" description="1200">
          <House />
        </DefinitionItem>
        <DefinitionItem term="Application Deadline" description="20 days left">
          <Clock />
        </DefinitionItem>
      </div>
    </Card>
  );
};

export default UserReactionCard;

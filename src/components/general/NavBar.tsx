import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/public/logo.png";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import { Container } from "../ui/container";

const NavBar = () => {
  return (
    <nav className="bg-white dark:bg-black">
      <Container
        variant="constrainedPadded"
        className="flex flex-row justify-between items-center border-b py-3  "
      >
        <Link href="/job-listings" className="flex flex-row items-center gap-2">
          <Image src={Logo} alt="logo" width={40} height={40} />
          <h1 className="font-bold text-2xl hidden md:inline-flex">
            Jobs<span className="text-primary font-semibold">:Mega</span>
          </h1>
        </Link>
        <ul className="flex flex-row gap-4 items-center">
          <ModeToggle />
          <li>
            <Button>Post Job</Button>
          </li>
          <li>
            <ProfileDropdown />
          </li>
        </ul>
      </Container>
    </nav>
  );
};

const ProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row items-center">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ChevronDown size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>One</DropdownMenuItem>
        <DropdownMenuItem>Two</DropdownMenuItem>
        <DropdownMenuItem>Three</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavBar;

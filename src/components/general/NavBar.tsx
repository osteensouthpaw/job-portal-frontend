import Logo from "@/public/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const NavBar = () => {
  return (
    <Container variant="constrainedPadded">
      <nav className="flex flex-row justify-between items-center border-b py-3">
        <Link href="/" className="flex flex-row items-center gap-2">
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
      </nav>
    </Container>
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

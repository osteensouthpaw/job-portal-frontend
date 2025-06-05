"use client";
import { UserResponse, UserType } from "@/app/auth/register/RegisterForm";
import { useAuth } from "@/app/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/public/logo.png";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { ModeToggle } from "./ModeToggle";
import SearchInput from "../ui/search-input";

const NavBar = () => {
  const { user } = useAuth();

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
        <SearchInput />
        <ul className="flex flex-row gap-4 items-center">
          <ModeToggle />
          {!user && (
            <li>
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
            </li>
          )}
          {user?.userType === UserType.RECRUITER && (
            <li>
              <Link href="/post-job">
                <Button>Post Job</Button>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <ProfileDropdown user={user} />
            </li>
          )}
        </ul>
      </Container>
    </nav>
  );
};

const ProfileDropdown = ({
  user: { firstName, lastName, imageUrl },
}: {
  user: UserResponse;
}) => {
  const { logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row items-center">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ChevronDown size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{`${firstName} ${lastName}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={logout}>Log out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavBar;

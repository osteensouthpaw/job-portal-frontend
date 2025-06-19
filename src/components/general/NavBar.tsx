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
import { ChevronDown, LogOutIcon, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import SearchInput from "../ui/search-input";
import { ModeToggle } from "./ModeToggle";

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
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{`${firstName} ${lastName}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile/me`}>
            <div className="flex gap-2">
              <User size={18} />
              <p>Profile</p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/profile/settings">
            <div className="flex gap-2">
              <Settings size={18} />
              <p>Settings</p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={logout}>
            <div className="flex gap-2">
              <LogOutIcon color="red" size={18} />
              <p>Log out</p>
            </div>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavBar;

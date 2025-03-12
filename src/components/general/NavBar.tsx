import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import { Container } from "../ui/container";
import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
  return (
    <Container variant="constrainedPadded">
      <nav className="flex flex-row justify-between items-center border-b py-2">
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
          <li>Profile</li>
        </ul>
      </nav>
    </Container>
  );
};

export default NavBar;

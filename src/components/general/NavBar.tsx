import React from "react";
import { Button } from "../ui/button";

const NavBar = () => {
  return (
    <nav className="flex flex-row justify-between items-center border-b py-2">
      <h1>Logo</h1>
      <ul className="flex flex-row gap-4 items-center">
        <li>Theme</li>
        <li>
          <Button>Post Job</Button>
        </li>
        <li>Profile</li>
      </ul>
    </nav>
  );
};

export default NavBar;

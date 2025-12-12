import Image from "next/image";
import React from "react";
import LogoIcon from "@/public/logo.png";

const Logo = () => {
  return (
    <div className="flex justify-self-center items-center gap-3 mb-10">
      <Image src={LogoIcon} alt="JobMega Logo" width={50} height={50} />
      <span className="text-4xl font-bold">
        Job<span className="text-primary">Mega</span>
      </span>
    </div>
  );
};

export default Logo;

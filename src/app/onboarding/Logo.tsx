import { Briefcase } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/job-listings" className="flex items-center gap-2 group">
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
        <Briefcase className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
        Job<span className="text-primary dark:text-white">Mega</span>
      </span>
    </Link>
  );
};

export default Logo;

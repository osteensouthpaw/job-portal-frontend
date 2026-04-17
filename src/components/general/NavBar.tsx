"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  FileText,
  Heart,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/app/AuthProvider";
import { logout, UserType } from "@/services/auth-service";
import Logo from "@/app/onboarding/Logo";
import Link from "next/link";

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onSearch?: (query: string) => void;
}

export default function Navbar({
  activeTab = "dashboard",
  onTabChange,
  onSearch,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const navLinks =
    user?.userType === UserType.JOB_SEEKER
      ? [
          { id: "dashboard", label: "Dashboard", icon: Home },
          { id: "jobs", label: "Find Jobs", icon: Briefcase },
          { id: "applications", label: "Applications", icon: FileText },
          { id: "saved", label: "Saved Jobs", icon: Heart },
        ]
      : [
          { id: "dashboard", label: "Dashboard", icon: Home },
          { id: "jobs", label: "Job Postings", icon: Briefcase },
          { id: "candidates", label: "Candidates", icon: User },
          { id: "messages", label: "Messages", icon: MessageSquare },
        ];

  // Fallback initials for avatar
  const getInitials = () => {
    if (user?.firstName || user?.lastName) {
      return `${user.firstName?.[0] ?? ""}${
        user.lastName?.[0] ?? ""
      }`.toUpperCase();
    }
    return "JD";
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.history.replaceState({}, "", "/job-listings");
      window.location.href = "/job-listings";
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  // Only show navLinks if not on dashboard and user is logged in
  const showNavLinks = !!user && activeTab !== "dashboard";

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Logo />

              {/* Desktop Navigation Links */}
              {showNavLinks && (
                <div className="hidden lg:flex items-center gap-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <button
                        key={link.id}
                        onClick={() => onTabChange?.(link.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          activeTab === link.id
                            ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {link.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Search Bar - Desktop */}
            {showNavLinks && (
              <div className="hidden md:flex flex-1 max-w-md mx-6">
                <form onSubmit={handleSearch} className="w-full relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search jobs, companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500"
                  />
                </form>
              </div>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle - Desktop */}
              <div className="hidden md:block">
                <ModeToggle />
              </div>
              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-600 dark:text-green-400">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline text-sm font-medium">
                        {user?.firstName || user?.lastName
                          ? `${user.firstName ?? ""} ${
                              user.lastName ?? ""
                            }`.trim()
                          : "User"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">
                          {user?.firstName || user?.lastName
                            ? `${user.firstName ?? ""} ${
                                user.lastName ?? ""
                              }`.trim()
                            : "User"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email ?? ""}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => onTabChange?.("profile")}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => onTabChange?.("settings")}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer md:hidden">
                      <Moon className="w-4 h-4 mr-2" />
                      Dark Mode
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help & Support
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 dark:text-red-400"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login">
                  <Button variant="default" size="sm" className="font-semibold">
                    Login
                  </Button>
                </Link>
              )}
              {/* Mobile Menu Toggle (only if logged in) */}
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showNavLinks && (
            <div className="md:hidden pb-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search jobs, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && showNavLinks && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        onTabChange?.(link.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === link.id
                          ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && showNavLinks && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

"use client";

import Pagination from "@/components/general/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobPosts } from "@/hooks/useJobPosts";
import {
  ExperienceLevel,
  JobPostResponse,
  JobType,
  WorkMode,
} from "@/services/jobPost-service";
import {
  Briefcase,
  Clock,
  DollarSign,
  Search,
  SlidersHorizontal,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import JobPostCard from "./components/JobPostCard";

interface Filters {
  jobType: string[];
  workMode: string[];
  experience: string[];
  datePosted: string;
  minSalary: string;
}

export default function JobBrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState<"newest" | "relevant" | "salary">(
    "newest"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const [filters, setFilters] = useState<Filters>({
    jobType: [],
    workMode: [],
    experience: [],
    datePosted: "all",
    minSalary: "",
  });

  // Build params for API
  const apiParams = {
    jobType: filters.jobType.length ? filters.jobType[0] : undefined,
    workMode: filters.workMode.length ? filters.workMode[0] : undefined,
    experienceLevel: filters.experience.length
      ? filters.experience[0]
      : undefined,
    datePosted: filters.datePosted !== "all" ? filters.datePosted : undefined,
    salaryMin: filters.minSalary || undefined,
    search: searchQuery || undefined,
    sortBy,
    page: currentPage - 1,
    size: jobsPerPage,
  };

  // Fetch jobs from backend
  const { data, isLoading, error } = useJobPosts(apiParams);

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters({ ...filters, ...newFilters });
    setCurrentPage(1);
  };

  const handleCheckboxChange = (category: keyof Filters, value: string) => {
    const currentValues = filters[category] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    handleFilterChange({ [category]: newValues });
  };

  const clearAllFilters = () => {
    setFilters({
      jobType: [],
      workMode: [],
      experience: [],
      datePosted: "all",
      minSalary: "",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const activeFiltersCount =
    filters.jobType.length +
    filters.workMode.length +
    filters.experience.length +
    (filters.datePosted !== "all" ? 1 : 0) +
    (filters.minSalary ? 1 : 0);

  const jobs = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;
  const pageNumber = data?.pageNumber ?? 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-green-600 dark:text-green-400 mb-2">
            Browse Jobs
          </h1>
          <p className="text-muted-foreground">
            Discover your next career opportunity from{" "}
            {data?.totalElements ?? 0} available positions
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by job title, company, or skills..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={sortBy}
              onValueChange={(value: any) => setSortBy(value)}
            >
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Newest
                  </div>
                </SelectItem>
                <SelectItem value="relevant">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Most Relevant
                  </div>
                </SelectItem>
                <SelectItem value="salary">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Highest Salary
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-green-600 text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-full lg:w-80 space-y-4">
              <Card className="border-green-100 dark:border-green-900/30">
                <CardHeader className="border-b border-green-100 dark:border-green-900/30 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-900 dark:text-green-100 flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5" />
                      Filters
                    </CardTitle>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Job Type Filter */}
                  <div className="space-y-3">
                    <Label className="text-green-900 dark:text-green-100">
                      Job Type
                    </Label>
                    <div className="space-y-2">
                      {Object.values(JobType).map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={filters.jobType.includes(type)}
                            onCheckedChange={() =>
                              handleCheckboxChange("jobType", type)
                            }
                          />
                          <label
                            htmlFor={`type-${type}`}
                            className="text-sm cursor-pointer capitalize"
                          >
                            {type.replace("_", " ").toLowerCase()}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800" />

                  {/* Work Mode Filter */}
                  <div className="space-y-3">
                    <Label className="text-green-900 dark:text-green-100">
                      Work Mode
                    </Label>
                    <div className="space-y-2">
                      {Object.values(WorkMode).map((mode) => (
                        <div key={mode} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mode-${mode}`}
                            checked={filters.workMode.includes(mode)}
                            onCheckedChange={() =>
                              handleCheckboxChange("workMode", mode)
                            }
                          />
                          <label
                            htmlFor={`mode-${mode}`}
                            className="text-sm cursor-pointer capitalize"
                          >
                            {mode.replace("_", " ").toLowerCase()}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800" />

                  {/* Experience Level Filter */}
                  <div className="space-y-3">
                    <Label className="text-green-900 dark:text-green-100">
                      Experience Level
                    </Label>
                    <div className="space-y-2">
                      {Object.values(ExperienceLevel).map((level) => (
                        <div
                          key={level}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`exp-${level}`}
                            checked={filters.experience.includes(level)}
                            onCheckedChange={() =>
                              handleCheckboxChange("experience", level)
                            }
                          />
                          <label
                            htmlFor={`exp-${level}`}
                            className="text-sm cursor-pointer capitalize"
                          >
                            {level.replace("_", " ").toLowerCase()}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800" />

                  {/* Date Posted Filter */}
                  <div className="space-y-3">
                    <Label className="text-green-900 dark:text-green-100">
                      Date Posted
                    </Label>
                    <Select
                      value={filters.datePosted}
                      onValueChange={(value) =>
                        handleFilterChange({ datePosted: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undefined">All Time</SelectItem>
                        <SelectItem value="minute">Last Minute</SelectItem>
                        <SelectItem value="hour">Last Hour</SelectItem>
                        <SelectItem value="day">Last 24 Hours</SelectItem>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800" />

                  {/* Salary Filter */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="salary-min"
                      className="text-green-900 dark:text-green-100"
                    >
                      Minimum Salary
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="salary-min"
                        type="number"
                        placeholder="e.g., 50000"
                        value={filters.minSalary}
                        onChange={(e) =>
                          handleFilterChange({ minSalary: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Filter Summary */}
              {activeFiltersCount > 0 && (
                <Card className="border-green-100 dark:border-green-900/30">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-green-600 dark:text-green-400">
                        Active Filters ({activeFiltersCount})
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-6 text-xs"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filters.jobType.map((type) => (
                        <Badge
                          key={type}
                          variant="secondary"
                          className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        >
                          {type.replace("_", " ").toLowerCase()}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() =>
                              handleCheckboxChange("jobType", type)
                            }
                          />
                        </Badge>
                      ))}
                      {filters.workMode.map((mode) => (
                        <Badge
                          key={mode}
                          variant="secondary"
                          className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        >
                          {mode.replace("_", " ").toLowerCase()}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() =>
                              handleCheckboxChange("workMode", mode)
                            }
                          />
                        </Badge>
                      ))}
                      {filters.experience.map((exp) => (
                        <Badge
                          key={exp}
                          variant="secondary"
                          className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        >
                          {exp.replace("_", " ").toLowerCase()}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() =>
                              handleCheckboxChange("experience", exp)
                            }
                          />
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </aside>
          )}

          {/* Job Listings */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {jobs.length} of {data?.totalElements ?? 0} jobs
              </p>
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="hidden lg:flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {showFilters ? "Hide" : "Show"} Filters
                {activeFiltersCount > 0 && (
                  <Badge className="bg-green-600 text-white">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {isLoading ? (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardContent className="p-12 text-center">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-foreground mb-2">Loading jobs...</h3>
                  </CardContent>
                </Card>
              ) : jobs.length > 0 ? (
                jobs.map((job: JobPostResponse) => (
                  <JobPostCard key={job.id} jobPost={job} />
                ))
              ) : (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardContent className="p-12 text-center">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-foreground mb-2">No jobs found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search query
                    </p>
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="text-green-600 dark:text-green-400"
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                pageNumber={pageNumber}
                pageSize={data?.pageSize || 1}
                totalPages={data?.totalPages || 1}
                onPrevious={() =>
                  setCurrentPage((prev) => Math.max(1, prev - 1))
                }
                onNext={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                onCurrent={(page) => setCurrentPage(page)}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  offset: number;
}

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onCurrent: (page: number) => void;
}

const Pagination = ({
  pageNumber,
  totalPages,
  pageSize,
  onPrevious,
  onNext,
  onCurrent,
}: PaginationProps) => {
  const router = useRouter();
  const currentPage = pageNumber + 1;
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage - 1)); // Adjust for zero-based index
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // Show first, last, current, and pages around current
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onCurrent(page)}
                className={
                  currentPage === page
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : ""
                }
              >
                {page}
              </Button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="px-2">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Pagination;

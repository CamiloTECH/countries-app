"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui";

import { FC } from "react";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
const maxRangePages = 2

const Pagination: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const allPages = [];
    const rangePages = [];

    const start = Math.max(2, currentPage - maxRangePages);
    const final = Math.min(totalPages - 1, currentPage + maxRangePages);

    for (let page = start; page <= final; page++) {
      rangePages.push(page);
    }

    if (currentPage - maxRangePages > 2) {
      allPages.push(1, "...");
    } else {
      allPages.push(1);
    }
    allPages.push(...rangePages);

    if (currentPage + maxRangePages < totalPages - 1) {
      allPages.push("...", totalPages);
    } else {
      allPages.push(totalPages);
    }

    return allPages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getVisiblePages().map((page, index) => (
        <Button
          size="sm"
          key={index}
          disabled={typeof page !== "number"}
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => typeof page === "number" && onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;

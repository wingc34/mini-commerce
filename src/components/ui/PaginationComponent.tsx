import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useCallback } from 'react';

export function PaginationComponent({
  page,
  setPage,
  totalPages = 4,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) {
  const onPageClick = useCallback(
    (page: number) => {
      setPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [page, setPage]
  );

  return (
    <Pagination className="py-4 mt-6">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() => {
                onPageClick(page - 1);
              }}
            />
          </PaginationItem>
        )}
        {page > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              onClick={() => {
                onPageClick(page - 1);
              }}
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem className="cursor-pointer">
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {page < totalPages && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              onClick={() => {
                onPageClick(page + 1);
              }}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < totalPages && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() => {
                onPageClick(page + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

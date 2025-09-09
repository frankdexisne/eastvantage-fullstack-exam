import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

interface IAppPagination {
  lastPage: number;
  page: number;
  onChangePage: (page: number) => void;
}

export default function AppPagination({
  lastPage,
  page,
  onChangePage,
}: IAppPagination) {
  const onPrevious = () => {
    if (page > 1) onChangePage(page - 1);
  };
  const onNext = () => {
    if (page < lastPage) onChangePage(page + 1);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={onPrevious}
            href="#"
            size="default"
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {Array.from({ length: lastPage }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={page === index + 1}
              onClick={() => onChangePage(index + 1)}
              href="#"
              size="default"
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={onNext}
            href="#"
            size="default"
            className={
              page === lastPage ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

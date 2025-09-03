import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useTranslation } from "react-i18next";

interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
}

export function TableFooter({currentPage, totalPages, pageSize, onPageChange}: TableFooterProps) {
  const { t } = useTranslation();
    return (
    <div className="flex justify-between items-center py-4">
      <span className="text-gray-400 text-sm">
        {t("Showing_data")} {(currentPage - 1) * pageSize + 1} -{" "}
        {Math.min(currentPage * pageSize, totalPages * pageSize)} {t("of")}{" "}
        {totalPages * pageSize} entries
      </span>
      <Pagination
        className="shrink-0"
        count={totalPages}
        page={currentPage}
        boundaryCount={1}
        siblingCount={1}
        renderItem={(item) =>
          item.type === "start-ellipsis" || item.type === "end-ellipsis" ? (
            <span>...</span>
          ) : (
            <PaginationItem
              {...item}
              classes="hover:bg-blue-500"
              shape="rounded"
              color="primary"
              onClick={() => onPageChange(item.page ?? currentPage)}
            />
          )
        }
      />
    </div>
  );
}
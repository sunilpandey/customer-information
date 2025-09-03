import { SearchBar } from "../../common/SearchBar";
import { SORT_ORDERS } from "../../../core/constants";
import { useTranslation } from "react-i18next";
interface CustomerListHeaderProps {
  onSortOrderChange: (newSortOrder: string) => void;
  sortOrder: string;
  searchTerm: string;
  onSearchTermChange: (newSearchTerm: string) => void;
}

export function CustomerListHeader({ sortOrder, onSortOrderChange, searchTerm, onSearchTermChange }: CustomerListHeaderProps) {
    const { t } = useTranslation();
    return (
    <div className="flex justify-between items-center py-4">
      <div className="flex flex-col gap-2.5">
        <h2 className="font-bold text-xl">{t("All_Customers")}</h2>
        <span className="text-green-500 text-md">{t("Active_Members")}</span>
      </div>
      <div className="flex gap-1">
        <SearchBar
          onSearchTermChange={onSearchTermChange}
          searchTerm={searchTerm}
          placeHolder={t("Search_company")}
        />
        <div
          className="flex items-center py-2 px-2 rounded-lg text-xs"
          style={{ backgroundColor: "#f0f0f0" }}
        >
          {t("Sort_By")}:{" "}
          <select
            className="font-bold outline-none bg-transparent"
            onChange={(e) => onSortOrderChange(e.target.value)}
            value={sortOrder}
          >
            <option value={SORT_ORDERS.DESC}>{t("Newest")}</option>
            <option value={SORT_ORDERS.ASC}>{t("Oldest")}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
import { useTranslation } from "react-i18next";
import { SearchBar } from "./SearchBar";

interface NavBarProps {
  userName: string;
}

export function NavBar({ userName }: NavBarProps) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between">
      <span className="font-bold shrink-0 text-xl">
        {t('greeting', { name: userName })} &#128075;,
      </span>
      <SearchBar searchTerm="" onSearchTermChange={() => {}} />
    </div>
  );
}
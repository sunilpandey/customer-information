import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { SEARCH_PLACEHOLDER } from '../../core/constants';
interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (newSearchTerm: string) => void;
  placeHolder?: string;
}

export function SearchBar({
  searchTerm,
  onSearchTermChange,
  placeHolder = SEARCH_PLACEHOLDER,
}: SearchBarProps) {
  return (
    <div className="flex border-1 border-gray-300 rounded-lg focus-within:border-blue-950 px-2 py-1 gap-2 items-center">
      <SearchOutlinedIcon />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="rounded-lg outline-none"
        placeholder={placeHolder}
      />
    </div>
  );
}
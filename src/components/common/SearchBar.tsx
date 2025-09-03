import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SEARCH_PLACEHOLDER } from '../../core/constants';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (newSearchTerm: string) => void;
  placeHolder?: string;
  debounceDelay?: number;
}

export function SearchBar({
  searchTerm,
  onSearchTermChange,
  placeHolder = SEARCH_PLACEHOLDER,
  debounceDelay = 300,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchTerm);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const debouncedSearch = useCallback(
    (value: string) => {
      if (debounceDelay === 0) {
        onSearchTermChange(value);
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onSearchTermChange(value);
      }, debounceDelay);
    },
    [onSearchTermChange, debounceDelay]
  );

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex border-1 border-gray-300 rounded-lg focus-within:border-blue-950 px-2 py-1 gap-2 items-center">
      <SearchOutlinedIcon />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className="rounded-lg outline-none"
        placeholder={placeHolder}
      />
    </div>
  );
}
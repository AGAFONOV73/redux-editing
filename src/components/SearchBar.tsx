import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setSearchTerm, clearSearch } from "../store/slices/filterSlice";
import { selectFilterStats } from "../store/selectors/servicesSelectors";
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.filter.searchTerm);
  const stats = useAppSelector(selectFilterStats);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      dispatch(setSearchTerm(localSearchTerm));
    }, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [localSearchTerm, dispatch]);

  const handleClear = () => {
    setLocalSearchTerm("");
    dispatch(clearSearch());

    inputRef.current?.focus();
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Поиск услуг..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
        />
        {localSearchTerm && (
          <button className="search-clear" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
      <div className="search-stats">
        Найдено: {stats.found} из {stats.total} услуг
      </div>
    </div>
  );
};

export default SearchBar;

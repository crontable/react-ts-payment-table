import { useState, useRef, useEffect } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface UseSelectBoxProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export function useSelectBox({ options, value, onChange }: UseSelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색어로 필터링된 옵션
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchText.toLowerCase()));

  // 선택된 옵션 찾기
  const selectedOption = options.find((opt) => opt.value === value);

  // 옵션 선택 핸들러
  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchText('');
  };

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 검색어 변경
  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  // 드롭다운 열릴 때 input에 포커스
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 외부 클릭 및 ESC 키 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  return {
    state: {
      isOpen,
      searchText,
      filteredOptions,
      selectedOption,
    },
    ref: {
      containerRef,
      inputRef,
    },
    action: {
      handleSelect,
      toggleDropdown,
      handleSearchChange,
    },
  };
}
